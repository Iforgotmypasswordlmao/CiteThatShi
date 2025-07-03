"TODO: Comments"

/**
 * 
 * @param {String} QuerySelect 
 * @param {String} Property 
 * @returns the propety of an html element
 */
// ALright so this function uses the queries from Potential locations (locations.js) to find every element/tag that matches and then extracts the property from them
function getPotentialLocation(QuerySelect, Property)
{
    const HtmlElement = document.querySelectorAll(QuerySelect)
    if (HtmlElement.length != 0)
    {
        const HtmlArray = Array.from(HtmlElement)
        return HtmlArray.map((item) => {return item[Property]})
    }
    return null
}
/**
 * 
 * @param {Array} QuerySelectList 
 * @returns 
 */
// After searching through every possible location according to locations.js, this function goes through the list and returns the first non null content from the property
function searchPotentialLocations(QuerySelectList)
{
    for (let Item in QuerySelectList)
    {
        const Location = QuerySelectList[Item]
        const Element = getPotentialLocation(Location['Query'], Location['Property'])
        if (Element != null)
        {
            return Element
        }
    }
    return null
}

/**
 * 
 * @param {String} JsonText 
 * @returns
 */
// Alright so if u came from the scrape.js file, you would know this is used to parse the schema and WHY IT HAS TO EXIST IN THE FIRST PLACE
function parseJSONLikeABoss(JsonText)
{
    const lastCurlyBracket =  ( JsonText.split("").reverse().join("") ).indexOf('}')  //Blame World Health Organisation for this
    const lastBracket =  ( JsonText.split("").reverse().join("") ).indexOf(']')
    // Tries to get the lower of the two variables
    let lastValidJsonElement = 0
    if (lastBracket == -1)
    {
        lastValidJsonElement = lastCurlyBracket
    }
    else if (lastCurlyBracket == -1)
    {
        lastValidJsonElement = lastBracket
    }
    else if (lastBracket < lastCurlyBracket)
    {
        lastValidJsonElement = lastBracket
    }
    else
    {
        lastValidJsonElement = lastCurlyBracket
    }
    // parses everything upto the last valid } or ]
    return JSON.parse(JsonText.slice(0, JsonText.length - lastValidJsonElement))
}