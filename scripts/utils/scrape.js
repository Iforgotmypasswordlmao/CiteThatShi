"TODO: Comments, YT NOTIF IN TITILE"

/**
 * All potential locations from ./locations.js
 * function getPotentialLocation, searchPotentialLocations, parseJSONLikeABoss from ./functions.js
 */
class ScrapeBot
{
    constructor()
    {
        // Most webpages have a schema, so this code just reads it and parses it 
        this.schemas = ( Array.from( document.querySelectorAll('script[type="application/ld+json"]') ) ).map( (item) => {
            // some BAKA webpages (World Health organisation) have a semicolon at the end, so this just parses the contents so its actually valid
            return parseJSONLikeABoss(item['innerText'])
        })

        // Another BAKA code which makes sure the schema is not an array containing a json object [{}]
        const CheckIfArrayInsideAnArray = (this.schemas.length == 1) && (Array.isArray(this.schemas[0]))
        this.schemas = CheckIfArrayInsideAnArray ? this.schemas[0] : this.schemas

        // all the useful stuff we want from the schema
        this.WebpageMetaData = {}
        const PropertiesList = [
            'author', 
            'datePublished',
            'publisher',
            'uploadDate',
            'pageStart',
            'pageEnd'
        ]
        for (let item in PropertiesList)
        {
            const Property = PropertiesList[item]
            this.WebpageMetaData[Property] = null
            // Loops through all the schemas and gets the relevant properties
            for (let schema in this.schemas)
            {
                // Another BAKA code that has to check if the actual object isnt stored in 'mainEntity'
                const MetaData = this.schemas[schema]['mainEntity'] ? this.schemas[schema]['mainEntity'] : this.schemas[schema]
                if (MetaData[Property])
                {
                    this.WebpageMetaData[Property] = MetaData[Property]
                }
            }
        }

    }

    getAuthors()
    {
        // Ngl its kinda stupid how i have to check if the category exist before returning it
        if (this.WebpageMetaData['author'])
        {
            // Sometimes there are multiple authors and this code makes sure we get all of them
            if (Array.isArray(this.WebpageMetaData['author']))
            {
                return this.WebpageMetaData['author'].map(author => {
                    if (author['name'])
                    {
                        return author['name']
                    }
                })
            }

            // stupid check i have to do
            if (this.WebpageMetaData['author']['name'])
            {
                return [this.WebpageMetaData['author']['name']]
            }
        }

        // If the information cannot be found in the schema object, we just use metadata to find
        const PotAuthors = searchPotentialLocations(PotentialAuthorsLocations)
        if (PotAuthors)
        {
            return PotAuthors
        }
        return []
    }

    getTitle()
    {
        const PotTitle = searchPotentialLocations(PotentialTitleLocations)
        if (PotTitle)
        {
            // for some reason websites include "| by UWNRWN" in their title tag
            return (PotTitle[0]).split('|')[0]
        }
        return ""
    }

    getPublishedDate()
    {
        if (this.WebpageMetaData['datePublished'])
        {
            return this.WebpageMetaData['datePublished'].slice(0, 10)
        }

        const PotPublishedDate = searchPotentialLocations(PotentialPublishedDateLocations)
        if (PotPublishedDate)
        {
            return (PotPublishedDate[0].slice(0, 10)).replaceAll('/', '-')
        }

        // this one is for video specifically
        if (this.WebpageMetaData['uploadDate'])
        {
            return this.WebpageMetaData['uploadDate'].slice(0, 10)
        }

        return ""
    }

    getAccessedDate()
    {
        const CurrentDate = new Date().toISOString().slice(0, 10)
        return CurrentDate
    }

    getUrl()
    {
        return window.location.href
    }

    getPublisher()
    {
        // this is such a BAKA example of checking locations its not even funny
        if (this.WebpageMetaData['publisher'])
        {
            if (this.WebpageMetaData['publisher']['name'])
            {
                return this.WebpageMetaData['publisher']['name']
            }
            
        }

        const PotPublisher = searchPotentialLocations(PotentialPublisherLocations)
        if (PotPublisher)
        {
            return PotPublisher[0]
        }
        return ""
    }

    getDOI()
    {
        const PotDOI = searchPotentialLocations(PotentialDOILocations)
        if (PotDOI)
        {
            return PotDOI[0]
        }
        return ""
    }

    getOrgAuthor()
    {   
        // ANOTHR STUPID CHECKING MECHANISM, I WISH I KNEW HOW TO DO BETTER BUT IDK
        if (!this.WebpageMetaData['author'])
        {
            return ""
        }
        if (!this.WebpageMetaData['author']['@type'])
        {
            return ""
        }
        if (this.WebpageMetaData['author']['@type'] != 'Person')
        {
            return this.WebpageMetaData['author']['name'] ? this.WebpageMetaData['author']['name'] : ""
        }
        return ""
        
    }

    getJournalTitle()
    {
        const PotJournalTitle = searchPotentialLocations(PotentialJournalTitleLocations)
        if (PotJournalTitle)
        {
            return PotJournalTitle[0]
        }
        return ""
    }

    getJournalVolume()
    {
        const PotJournalVolume = searchPotentialLocations(PotentialJournalVolumeLocations)
        if (PotJournalVolume)
        {
            return PotJournalVolume[0]
        }
        return ""
    }

    getJournalIssue()
    {
        const PotJournalIssue = searchPotentialLocations(PotentialJournalIssueLocations)
        if (PotJournalIssue)
        {
            return PotJournalIssue[0]
        }
        return ""
    }

    getJournalPage()
    {
        // Thank the tech giants for schema
        if (this.WebpageMetaData['pageEnd'] && this.WebpageMetaData['pageStart'])
        {
            return `${this.WebpageMetaData['pageStart']}-${this.WebpageMetaData['pageEnd']}`
        }

        // THis is literally just to check if there is 2 numbers
        let SumOfValidEntries = 0
        const JournalPageRange = [getPotentialLocation('[name="citation_firstpage"]', 'content'), getPotentialLocation('[name="citation_lastpage"]', 'content')]
        JournalPageRange.map(item => {
            if (item)
            {
                SumOfValidEntries++;
                return item[0]
            }
        })

        if (SumOfValidEntries == 2)
        {
            return `${JournalPageRange[0]}-${JournalPageRange[1]}`
        }
        return ""
    }

    generateMetaData()
    {
        return {
            'Authors': this.getAuthors(),
            'AccessedDate': this.getAccessedDate(),
            'Url': this.getUrl(),
            'PublishedDate': this.getPublishedDate(),
            'Title': this.getTitle(),
            'Publisher': this.getPublisher(),
            'DOI': this.getDOI(),
            'OrgAuthor': this.getOrgAuthor(),
            'JournalTitle': this.getJournalTitle(),
            'JournalVolume': this.getJournalVolume(),
            'JournalIssue': this.getJournalIssue(),
            'JournalPage': this.getJournalPage()
        }
    }
}
