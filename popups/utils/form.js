"TODO: Comments"

const FormElements = {
    'Method': document.getElementById("Method"),
    'Media': document.getElementById("Media"),
    'Authors': document.getElementById("Authors"),
    'PublishedDate': document.getElementById("PublishedDate"),
    'AccessedDate': document.getElementById("AccessedDate"),
    'Title': document.getElementById("Title"),
    'Url': document.getElementById("Url"),
    'Publisher': document.getElementById("Publisher"),
    'DOI': document.getElementById("DOI"),
    'OrgAuthor': document.getElementById("OrgAuthor"),
    'JournalTitle': document.getElementById('JournalTitle'),
    'JournalVolume': document.getElementById('JournalVolume'),
    'JournalIssue': document.getElementById('JournalIssue'),
    'JournalPage': document.getElementById('JournalPage')
}

// converts the form to a JSON object for generating citation
function ConvertFormToJSON()
{
    const ReturnForm = {...FormElements}
    Object.entries(ReturnForm).forEach(item => {
        const [key, value] = item
        ReturnForm[key] = value['value']
    })
    ReturnForm['Authors'] = ReturnForm['Authors'] ? ReturnForm['Authors'].split(',') : ""
    return ReturnForm
}

// updates the form from incoming metadata
function UpdateForm(MetaData)
{
    const CurrentForm = {...FormElements}
    delete CurrentForm['Method']
    delete CurrentForm['Media']
    
    Object.entries(CurrentForm).forEach(item => {
        const [field, element] = item
        element['value'] = MetaData[field]
    })
}

// clears every field
function ClearFormData()
{
    const CurrentForm = {...FormElements}
    delete CurrentForm['Method']
    delete CurrentForm['Media']
    Object.entries(CurrentForm).forEach(item => {
        const [field, element] = item
        element['value'] = ""
    })
}

// shows the required fields
function ShowFields(Fields)
{
    const RequiredFields = ['Method', 'Media'].concat(Fields)
    Object.entries({...FormElements}).forEach(item => {
        const [key, Element] = item
        const HideSectionElement = Element.parentElement
        HideSectionElement['style']['display'] = 'none'
    })

    RequiredFields.forEach((field) => {
        const ShowSectionElement = FormElements[field].parentElement
        ShowSectionElement['style']['display'] = 'block'
    })
}
