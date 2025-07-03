"TODO: Comments"

/**
 * SO listen fam, this is my explanation on why this exist, so this makes finding elements by queries and extracting them by their properties
 * like 10x easier so each variable here corresponds to a field and stores POTENTIAL locations of metadata
 */
const PotentialAuthorsLocations =
[
    {'Query': '[name="author"]', 'Property': 'content'},
    {'Query': '[name="citation_author"]', 'Property': 'content'},
    {'Query': '[name="article:author"]', 'Property': 'content'},
    {'Query': 'span[itemprop="item"] > [itemprop="name"]', 'Property': 'content'}
]

const PotentialTitleLocations = 
[
    {'Query': '[name="citation_title"]', 'Property': 'content'},
    {'Query': '[name="og:title"]', 'Property': 'content'},
    {'Query': '[property="twitter:title"]', 'Property': 'content'},
    {'Query': '[property="og:title"]', 'Property': 'content'},
    {'Query': '[name="twitter:title"]', 'Property': 'content'},
    {'Query': '[itemprop="name"]', 'Property': 'content'},
    {'Query': '[id="video-title-link"]', 'Property': 'title'},
    {'Query': 'title', 'Property': 'innerText'}
]

const PotentialPublishedDateLocations = 
[
    {'Query': '[name="citation_publication_date"]', 'Property': 'content'},
    {'Query': '[property="article:published_time"]', 'Property': 'content'},
    {'Query': '[itemprop="datePublished]', 'Property': 'content'},
    {'Query': '[name="dc.date"]', 'Property': 'content'},
    {'Query': '[name="prism.publicationDate"]', 'Property': 'content'},
    {'Query': 'time', 'Property': 'dateTime'}
    
]

const PotentialPublisherLocations = 
[
    {'Query': '[name="citation_publisher"]', 'Property': 'content'},
    {'Query': '[name="dc.publisher"]', 'Property': 'content'},
    {'Query': '[name="article:publisher"]', 'Property': 'content'},
    {'Query': '[property="og:site_name"]', 'Property': 'content'}
]

const PotentialDOILocations = 
[
    {'Query': '[name="citation_doi"]', 'Property': 'content'},
    {'Query': '[name="DOI"]', 'Property': 'content'},
    {'Query': '[name="dc.identifier"]', 'Property': 'content'}
]

const PotentialJournalTitleLocations = 
[
    {'Query': '[name="citation_journal_title"]', 'Property': 'content'},
    {'Query': '[name="prism.publicationName"]', 'Property': 'content'}
]

const PotentialJournalVolumeLocations = 
[
    {'Query': '[name="citation_volume"]', 'Property': 'content'},
    {'Query': '[name="prism.volume"]', 'Property': 'content'}
]

const PotentialJournalIssueLocations = 
[
    {'Query': '[name="citation_issue"]', 'Property': 'content'},
    {'Query': '[name="prism.number"]', 'Property': 'content'},
]