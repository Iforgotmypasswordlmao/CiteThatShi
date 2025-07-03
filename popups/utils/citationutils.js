"TODO: COMMENTS"

// To capitalise words mostly used for names
function CapitaliseWord(str)
{
    return str && String(str[0]).toUpperCase() + String(str).slice(1);
}

// This just parses authors in the APA Style
function APAParseAuthors(Authors)
{
    if (!Authors)
    {
        return ""
    }

    let ParsedAuthors = []
    for (let element in Authors)
    {
        Name = Authors[element]
        const ParsedName = []
        const RemainNames = Name.split(' ')
        const LastName = RemainNames.pop()
        ParsedName.push(`${CapitaliseWord(LastName)},`)
        if (RemainNames.length > 0)
        {
            RemainNames.forEach(OtherNames => {
                ParsedName.push(`${OtherNames[0].toUpperCase()}.`)
            })
        }
        ParsedAuthors.push(ParsedName.join(' '))
    }
    if (Authors.length == 1)
    {
        return ParsedAuthors[0]
    }
    if (Authors.length < 21)
    {
        const LastAuthor = ParsedAuthors.pop()
        const OtherAuthors = ParsedAuthors.join(', ')
        return `${OtherAuthors}, & ${LastAuthor}`
    }

    if (Authors.length >= 21)
    {
        const First19Authors = ParsedAuthors.slice(0, 19).join(', ')
        const LastAuthor = ParsedAuthors.pop()
        return `${First19Authors},... ${LastAuthor}`
    }

}

function ParseDate(PDate)
{
    if (!PDate)
    {
        return "n.d"
    }
    const ParsedDate = new Date(PDate)
    return `${ParsedDate.getFullYear()}, ${ParsedDate.toLocaleString('default', { month: 'long' })}, ${ParsedDate.toLocaleString('default', { day: 'numeric' })}`
    
}