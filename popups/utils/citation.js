"TODO: Everything."

// the bread and butter of this operation
const CitationStyleGuide = 
{
    "APA7": 
    {
        "Website": 
        {
            // these are the required fields, mostly used for display purposes and MEtadata gives all the fields
            "Fields": ["Authors", "Url", "PublishedDate", "Title", "Publisher", "OrgAuthor"],
            "Cite": (MetaData) => {
                return (`<p>
                    ${MetaData['OrgAuthor'] ? MetaData['OrgAuthor'] : APAParseAuthors(MetaData['Authors'])} 
                    (${ParseDate(MetaData['PublishedDate'])}). 
                    <em>${MetaData['Title'] ? `${MetaData['Title']}.` : ''}</em> 
                    ${MetaData['Publisher'] ? `${MetaData['Publisher']}.` : ''} 
                    <a href="${MetaData['Url']}">${MetaData['Url']}</a></p>`)
            }
        },
        "Book":  
        {
            "Fields": ["Authors", "Url", "DOI", "PublishedDate", "Title", "Publisher"],
            "Cite": (MetaData) => {
                const DOIORURL = MetaData['DOI'] ? `https://doi.org/${MetaData['DOI']}` : MetaData['Url']
                return (`<p>
                    ${APAParseAuthors(MetaData['Authors'])}
                    (${ParseDate(MetaData['PublishedDate']).split(',')[0]}).
                    <em>${MetaData['Title'] ? `${MetaData['Title']}.` : ''}</em>
                    ${MetaData['Publisher'] ? `${MetaData['Publisher']}.` : ''}
                    <a href="${DOIORURL}">${DOIORURL}</a></p>`)
            },
        },
        "Journal": 
        {
            "Fields": ["Authors", "Url", "DOI", "PublishedDate", "Title", "JournalTitle", "JournalIssue", "JournalVolume", "JournalPage"],
            "Cite": (MetaData) => {
                // yep this whole code is to parse the Journal information correctly. yep i hate it
                const JournalInfoRegex = />(.*)</
                
                const JournalInformation = ([
                    `<em>${MetaData['JournalTitle']}</em>`,
                    `<em>${MetaData['JournalVolume']}</em>${MetaData['JournalIssue'] ? `(${MetaData['JournalIssue']})` : ''}`,
                    `${MetaData['JournalPage']}`
                ]).filter((word) => {
                    const WordMatch = word.match(JournalInfoRegex)
                    if(WordMatch)
                    {
                        return (WordMatch[1] !== "")
                    }
                    return (word !== "")
                })
                
                const DOIORURL = MetaData['DOI'] ? `https://doi.org/${MetaData['DOI']}` : MetaData['Url']
                return (`<p>
                    ${APAParseAuthors(MetaData['Authors'])}
                    (${ParseDate(MetaData['PublishedDate']).split(',')[0]}).
                    ${MetaData['Title'] ? `${MetaData['Title']}.` : ''}
                    ${JournalInformation.join(', ') + (JournalInformation.length == 0 ? '' : '.')}
                    <a href="${DOIORURL}">${DOIORURL}</a></p>`)
            }
        },
        "Video":
        {
            "Fields": ["Authors", 'PublishedDate', "Title", "Publisher", "Url"],
            "Cite": (MetaData) => {
                return (`<p>
                    ${MetaData['Authors'] ? `${MetaData['Authors']}.` : ''}
                    (${ParseDate(MetaData['PublishedDate']).split(',')[0]}).
                    ${MetaData['Title'] ? `<em>${MetaData['Title']}</em>` : ''}
                    [Video].
                    ${MetaData['Publisher'] ? `${MetaData['Publisher']}.` : ''}
                    <a href="${MetaData['Url']}">${MetaData['Url']}</a>
                    </p>`)
            }
        }
    }
}