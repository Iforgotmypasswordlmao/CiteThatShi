"TODO: Comments and fix the retrieval"
/**
 * function ConvertFormToJSON, UpdateForm, ClearFormData, ShowFields from ./utils
 */
// this is how we communicate with the content script
async function RetrieveMetaData()
{
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.tabs.sendMessage(tab.id, {RetrieveMetaData: true});
    
    if (response != undefined)
    {
        UpdateForm(response['MetaData'])
    }
}

function main()
{
    // Initialises the options for the Reference input
    const MethodOptionElement = document.getElementById("Method")
    Object.entries({...CitationStyleGuide}).forEach(item => {
        const [StyleGuide, value] = item
        MethodOptionElement.add(new Option(StyleGuide, StyleGuide))
    })

    const ShowRequiredMediaFields = () => {
        const TypeOfMedia = FormElements['Media'].value
        const CitationGuide = FormElements['Method'].value
        const MediaRequiredFields = CitationStyleGuide[CitationGuide][TypeOfMedia]['Fields']
        ShowFields(MediaRequiredFields)
    }

    const OnMethodOptionChange = () => {
        const CurrentMethod = FormElements['Method'].value
        const MediaOptionsList = Object.entries({...CitationStyleGuide[CurrentMethod]}).map(item => {
            const [MediaType, value] = item
            return new Option(MediaType, MediaType)
        })

        const MediaOptionsDocumentFragment = new DocumentFragment

        MediaOptionsList.forEach(option => MediaOptionsDocumentFragment.appendChild(option))
        document.getElementById("Media").replaceChildren(MediaOptionsDocumentFragment)

    }

    const CopiedCitation = document.getElementById("CitationText")

    const GenerateCitationText = () => {
        const MetaDataPayload = ConvertFormToJSON()
        const CitationGeneration = CitationStyleGuide[MetaDataPayload['Method']][MetaDataPayload['Media']]['Cite']
        const GeneratedReference = CitationGeneration(MetaDataPayload)
        CopiedCitation.innerHTML = GeneratedReference
    }

    MethodOptionElement.addEventListener("change", (event) => {
        OnMethodOptionChange()
        ShowRequiredMediaFields()
        GenerateCitationText()
    })

    document.getElementById("Media").addEventListener("change", (event) => {
        ShowRequiredMediaFields()
        GenerateCitationText()
    })

    // "Generate MetaData Button"
    document.getElementById("RefreshMetaData").addEventListener("click", (event) => {
        event.preventDefault()
        ClearFormData()
        RetrieveMetaData().then(res => {
            GenerateCitationText()
        }).catch(err => {
            console.log(err)
        })
    })

    // Generates Citation whenever the tab is clicked
    document.getElementById("Citation").addEventListener("change", (event) => {
        GenerateCitationText()
    })

    // "Copy Button"
    document.getElementById("CopyCitationText").addEventListener("click", (event) => {
        event.preventDefault()
        navigator.clipboard.write([new ClipboardItem({
            'text/plain': new Blob([CopiedCitation.innerText], {type: 'text/plain'}),
            'text/html': new Blob([CopiedCitation.innerHTML], {type: 'text/html'})
        })]);
    })

    OnMethodOptionChange()
    ShowRequiredMediaFields()
    ClearFormData()
    RetrieveMetaData().then(() => {
        GenerateCitationText()
    }).catch(err => {
        console.log(err)
    })
}

window.onload = () => {
    main()
}