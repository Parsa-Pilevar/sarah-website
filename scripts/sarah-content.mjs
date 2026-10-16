// Sarah's site content, transcribed from her Word documents for the one-off import.
// The runner (import-content.mjs) adds aboutPage.photo at write time.

const UNIARTS_PROJECT_URL =
  'https://www.uniarts.fi/en/projects/understandings-of-artistic-professionalism-within-the-academy-of-fine-arts-the-university-of-the-arts-helsinki/'
const THESIS_URL = 'https://discovery.ucl.ac.uk/id/eprint/10197601/'

// A segment is a plain string, {em: 'text'} for italics, or {href, text} for a link.
function block(segments, key, extra = {}) {
  const children = []
  const markDefs = []
  segments.forEach((segment, i) => {
    const span = {_type: 'span', _key: `s${i}`, marks: []}
    if (typeof segment === 'string') {
      span.text = segment
    } else if (segment.href) {
      const markKey = `l${markDefs.length}`
      markDefs.push({_type: 'link', _key: markKey, href: segment.href})
      span.text = segment.text
      span.marks = [markKey]
    } else {
      span.text = segment.em
      span.marks = ['em']
    }
    children.push(span)
  })
  return {_type: 'block', _key: key, style: 'normal', markDefs, children, ...extra}
}

const keyed = (type, prefix, items) => items.map((item, i) => ({_type: type, _key: `${prefix}${i}`, ...item}))

const bullet = (segments, key) => block(segments, key, {listItem: 'bullet', level: 1})

function aboutPage() {
  const bio = [
    'I currently work as a postdoctoral researcher in higher education fine art pedagogy at University of the Arts Helsinki, Finland. My research here examines how the Master of Fine Arts at the Academy of Fine Arts prepares students to become professional artists and how this term is understood by staff and students.',
    'In 2024 I completed my Doctorate of Education at the Institute of Education, University College London. My thesis investigated how artistic professionalism was presented to and understood by students on a BA Fine Art programme in London and the factors that shaped whether students planned to pursue careers as artists after their degree.',
    'Alongside my doctorate I worked as a postgraduate teaching assistant on MA Art Education, Culture and Practice at the Institute of Education, University College London and as a professional practice and contextual studies lecturer in BA Fine Art at Arts University Bournemouth. Prior to this I worked as a researcher in arts education and pedagogy for various organisations including The Higher Education Academy, The Council for Higher Education in Art and Design, The Glasgow School of Art, a-n, the Contemporary Visual Arts Network, and The Arts Society.',
    'I am the Founding Director of Q-Art (2008-2018), an events and publishing organisation that shares approaches to teaching art across higher education institutions with the aim of helping more students thrive in the sector. Q-Art has published books and organised symposia on topics including art crits, the BA fine art curriculum, professional practice, the commercial gallery sector, and foundation art and design. I set Q-Art up whilst a BA Fine Art student at Goldsmiths, University of London.',
    'My research and teaching focuses on art education’s role in the production of contemporary artists.',
  ]

  return {
    _id: 'aboutPage',
    _type: 'aboutPage',
    name: 'Dr Sarah Rowles',
    title: 'Postdoctoral Researcher',
    affiliations: [
      'University of the Arts Helsinki',
      'Honorary Postdoctoral Research Fellow, Institute of Education, UCL',
    ],
    links: keyed('link', 'link', [
      {label: 'Doctoral thesis', url: THESIS_URL},
      {label: 'Q-Art', url: 'https://q-art.org.uk/'},
      {label: 'Uniarts Helsinki project', url: UNIARTS_PROJECT_URL},
      {label: 'ORCID', url: 'https://orcid.org/0009-0009-4525-1050'},
      {label: 'LinkedIn', url: 'https://www.linkedin.com/in/dr-sarah-rowles-44059b17/'},
    ]),
    bio: bio.map((text, i) => block([text], `b${i}`)),
  }
}

function qartPage() {
  return {
    _id: 'qartPage',
    _type: 'qartPage',
    body: [
      block(
        [
          'I am the Founding Director of Q-Art (2008-2018), an events and publishing organisation that shares approaches to teaching art across higher education institutions with the aim of helping more students thrive in the sector.',
        ],
        'b0'
      ),
      block(
        [
          'Between 2008-2018 Q-Art worked in partnership with 120 art universities, museums, galleries and organisations to produce:',
        ],
        'b1'
      ),
      bullet(
        [
          {href: 'https://q-art.org.uk/crits/', text: '70 cross-college crits'},
          ': for students and graduates from across London art universities to present and discuss their developing art work. Plus 6 annual exhibitions of participant work.',
        ],
        'b2'
      ),
      bullet(
        [
          {href: 'https://q-art.org.uk/workshops/', text: '80 workshops'},
          ' that introduced 14-16 year olds and their teachers to the crit and ways of analysing and talking about contemporary art.',
        ],
        'b3'
      ),
      bullet(
        [
          {href: 'https://q-art.org.uk/books-videos/', text: '5 publications'},
          ' featuring interviews with art lecturers and gallerists on topics including art crits, the BA Fine Art curriculum, professional practice, the commercial gallery sector, and foundation art and design.',
        ],
        'b4'
      ),
      bullet(
        [
          {href: 'https://q-art.org.uk/symposia/', text: '8 symposia'},
          ' that launched each publication and brought together participants from across the sector.',
        ],
        'b5'
      ),
      block(
        [
          'In 10 years Q-Art’s activity reached over 10,000 participants. Over 7000 Q-Art books have sold to art educators, students and libraries worldwide where they are actively shaping the learning and teaching of art education.',
        ],
        'b6'
      ),
      block(
        [
          'You can read more about Q-Art’s activity in our 10 year progress report ',
          {href: 'https://q-art.org.uk/wp-content/uploads/2017/11/Q-Art-Progress-Report.-2008-17.pdf', text: 'here'},
          '.',
        ],
        'b7'
      ),
    ],
    websiteUrl: 'https://q-art.org.uk/',
  }
}

function researchPage() {
  const publications = [
    {
      citation: [
        'Erkkilä-Hill, J.; Nurminen, M.; and Rowles, S. (2026). ',
        {em: 'Not knowing and its place in fine art practice and pedagogy.'},
        ' Aalto Art of Research conference journal of proceedings (pending publication). Aalto University.',
      ],
    },
    {
      citation: [
        'Lehikoinen, K., & Rowles, S. (2026). ',
        {
          em: 'Tensions in the discourses of professionalism in the arts: How can higher arts education support students in navigating these complexities?',
        },
        ' In ENCATC (Ed.), ',
        {
          em: 'ENCATC The European Network on Cultural Policy and Management 2026 congress proceedings: Artists and cultural & creative professionals at the centre: Rethinking work, policy, and cultural ecosystems',
        },
        ' (pp. 173–180).',
      ],
    },
    {
      citation: [
        'Rowles, S. (2026). ',
        {
          em: 'Ecologies of the undergraduate fine art curriculum: examining the factors that shaped whether final year students on a BA Fine Art programme in London could imagine themselves becoming professional artists.',
        },
        ' Special conference edition of The International Journal of Art and Design Education (pending publication).',
      ],
    },
    {
      citation: [
        'Rowles, S. (2026). ',
        {
          em: 'How the framing of artistic professionalism on a BA Fine Art programme can influence whether students go on to become professional artists in the future.',
        },
        ' In ENCATC (Ed.), ',
        {
          em: 'The European Network on Cultural Policy and Management 2026 congress proceedings: artists and cultural & creative professionals at the centre: Rethinking work, policy, and cultural ecosystems',
        },
        ' (pp. 86–93).',
      ],
    },
    {
      citation: [
        'Rowles, S. (2026). ',
        {em: 'Conversations on not knowing'},
        '. In Quaife, M. and Smith, T. (Eds.) (2026). Conversations in artist pedagogy. Uniarts Helsinki. (Pending publication).',
      ],
    },
    {
      citation: [
        'Rowles, S. (2024). ',
        {em: 'Examining the role of undergraduate fine art education in the production of professional artists.'},
        ' Doctoral Thesis. Institute of Education, University College London.',
      ],
      url: THESIS_URL,
    },
    {
      citation: [
        'Allen, J. and Rowles, S. (2016). ',
        {
          em: 'Professional Practice: 20 Questions – Interviews with UK undergraduate fine art staff exploring how students are prepared for life after art school.',
        },
        ' Q-Art. London. Funded by Kingston University, The Glasgow School of Art, a-n, and Swansea College of Art.',
      ],
    },
    {
      citation: [
        'Allen, J. and Rowles, S. (2013). ',
        {
          em: '15 Methods: 20 Questions – interviews with art and design educators uncovering the process, value and potential of art education.',
        },
        ' Q-Art. London. Funded by the Higher Education Academy.',
      ],
    },
    {
      citation: [
        'Rowles, S. (2013). ',
        {
          em: 'Art Crits: 20 Questions – A Pocket Guide – Featuring interviews with UK Fine Art staff in the topic of the Art Crit.',
        },
        ' Q-Art. London. Funded by the Higher Education Academy.',
      ],
    },
    {
      citation: [
        'Rowles, S. (2011). 11 Course Leaders: 20 Questions – ',
        {em: 'A collection of Interviews with 11 London BA Fine Art Course Leaders'},
        '. Q-Art. London.',
      ],
    },
    {
      citation: [
        'Rowles, S. (2008). 12 Gallerists: 20 Questions – ',
        {em: 'A collection of Interviews with 12 London Gallerists'},
        '. Q-Art. London.',
      ],
    },
  ]

  const presentations = [
    {
      date: 'September 2026',
      title:
        'Tensions in the discourses of professionalism in the arts: How can higher arts education support students in navigating these complexities?',
      details:
        'Presentation with Professor Kai Lehikoinen. European network on cultural management and policy (ENCATC) congress. Côte d’Azur University, Nice.',
    },
    {
      date: 'September 2026',
      title:
        'How the framing of artistic professionalism on a BA Fine Art programme can influence whether students go on to become professional artists in the future',
      details: 'European network on cultural management and policy (ENCATC) congress. Côte d’Azur University, Nice.',
    },
    {
      date: 'August 2026',
      title: 'Helping students navigate the freedoms of fine art studio culture and practice',
      details: 'Artist pedagogy and artistic thinking perspectives and practices conference. Uniarts Helsinki, Finland.',
    },
    {
      date: 'November 2025',
      title: 'Ecologies of the BA Fine Art Curriculum',
      details: 'The International Journal of Art and Design Education conference 2025 – Ecologies. (online).',
    },
    {
      date: 'April 2021',
      title: 'Q-Art',
      details: '‘Art School Pedagogy: 2.0. Pedagogy as Mentorship’ symposium at Columbia Teachers College, New York.',
    },
    {
      date: 'September 2019',
      title: 'Facilitating Inclusive Crits',
      details: 'Arts University Bournemouth Annual Teaching Conference.',
    },
    {
      date: 'June 2018',
      title: 'Access and Success in Contemporary Fine Art Education',
      details:
        '‘Instruction and Influence: Women In Art Education’. London School of Economics, University College London Art Museum, and The Slade School of Art.',
    },
    {
      date: 'October 2017',
      title: 'Professional Practice in UK Art Education',
      details:
        '‘Artistic Training Between Tradition and Experiment: Art Academies and Alternative Art Schools in Europe and Russia’. National Research University Higher School of Economics, St Petersburg, Russia.',
    },
    {
      date: 'June 2016',
      title: 'The teaching of professional practice in UK art schools',
      details: '‘Positioning the Academy’. Gerrit Rietveld Academy, Amsterdam.',
    },
    {
      date: 'May 2015',
      title: 'Q-Art',
      details:
        '7th ELIA Teachers Academy ‘Learning In/Through the Arts’, Fontys School of Fine and Performing Arts, Tilburg.',
    },
    {
      date: 'May 2014',
      title: 'Art Crits',
      details: 'The Higher Education Academy ‘Teaching in Practice’ Conference, Victoria & Albert Museum, London.',
    },
    {
      date: 'January 2014',
      title: 'Foundation art and design methods',
      details:
        '‘Possibility Space: New Environments and Practice in Foundation’. UAL Awarding Body Conference, Chelsea College of Art.',
    },
    {
      date: 'June 2013',
      title: '15 Methods: 20 Questions – A landscape of UK foundation courses',
      details: '‘A History Uncovered, A Future Imagined’, Tate Art School Educated & Paris College of Art, Paris.',
    },
    {
      date: 'March 2013',
      title: 'Fine art education – a vision for the future',
      details: 'CHEAD Annual Conference, Central Saint Martins, University of the Arts London.',
    },
    {
      date: 'March 2012',
      title: 'Liberating a new perspective: Q-Art and Starcom MediaVest partnership',
      details: 'The Culture Capital Exchange Business and Creativity Conference, The British Library.',
    },
    {
      date: 'January 2012',
      title: 'Keynote: Cultural capital and fine art education',
      details: 'University of the Arts London’s Annual Learning and Teaching Day, London College of Fashion.',
    },
    {
      date: 'April 2011',
      title: 'Findings from 11 Course Leaders: 20 Questions',
      details: 'National Association for Fine Art Education conference, Northumbria University.',
    },
  ]

  return {
    _id: 'researchPage',
    _type: 'researchPage',
    publications: publications.map(({citation, url}, i) => ({
      _type: 'publication',
      _key: `pub${i}`,
      citation: [block(citation, 'b0')],
      ...(url ? {url} : {}),
    })),
    presentations: keyed('presentation', 'talk', presentations),
    presentationsNote: 'Plus over 50 talks about Q-Art and its activities at universities worldwide.',
    networks: [
      'Pedagogies, education, arts, research (PEAR) – Uniarts Helsinki',
      'Sociology of Arts Network – European Sociological Association',
      'KUNO – Nordplus network of 18 Nordic-Baltic fine art academies',
      'National Association for Fine Art Education',
      'Artist/Pedagogy/Research – Society for Artistic Research Special Interest Group',
    ],
    showSpotlight: false,
  }
}

function employmentPage() {
  const researchRoles = [
    {
      years: '2025 – 2028',
      title: 'Postdoctoral Researcher in Higher Education Fine Art Pedagogy',
      organisation: 'Uniarts Helsinki',
      description: 'Project: Understandings of artistic professionalism within the Academy of Fine Arts.',
      url: UNIARTS_PROJECT_URL,
    },
    {
      years: '2025 – 2028',
      title: 'Honorary Postdoctoral Research Fellow',
      organisation: 'Institute of Education, University College London',
    },
    {
      years: '2018 – 2019',
      title: 'Research Associate: ‘Creative Careers’',
      organisation: 'Contemporary Visual Arts Network, London',
      description:
        'I developed fine art job profiles for the website ‘Discover! Creative Careers’ for 11-15 year-olds and helped train careers advisors in schools.',
    },
    {
      years: '2017 – 2018',
      title: 'Project evaluator: ‘Using arts to enrich history learning in schools’',
      organisation: 'The Arts Society London',
      description:
        'I evaluated a collaborative project between The Arts Society Greater London and a state school in Croydon that sought to understand how the arts can enrich learning in the history curriculum.',
    },
    {
      years: '2016 and 2012',
      title: 'Researcher: ‘Attitudes and approaches to teaching professional practice in UK higher art education’',
      organisation: 'The Artists Information Company (a-n)',
      description:
        'I was twice commissioned by a-n to produce a report on professional practice offerings in UK higher art education.',
    },
    {
      years: '2015 – 2016',
      title: 'Research Assistant: ‘Student Transitions through higher art and design education’',
      organisation: 'The Glasgow School of Art',
      description:
        'I interviewed staff from art, design, architecture programmes to produce case studies for the Quality Assurance Agency about how students are supported into, through and beyond higher education.',
    },
    {
      years: '2015 – 2015',
      title: 'Researcher: ‘Learning and teaching challenges in UK higher education art and design’',
      organisation: 'The Council for Higher Education in Art and Design and Higher Education Academy',
      description:
        'I conducted four nationwide focus groups with higher education art and design staff to inform the HEA’s future strategy.',
    },
    {
      years: '2014 – 2015',
      title: 'Research Assistant: ‘Phoenix Bursary: Graduate trajectories after the degree show fire’',
      organisation: 'The Glasgow School of Art',
      description:
        'After the May 2014 fire that damaged final year degree show work, GSA graduates were offered a six-month bursary and studio space to help them rebuild a portfolio. I interviewed graduates to analyse the impact of this support and produced an evaluative report.',
    },
    {
      years: '2013 – 2014',
      title: 'Research Assistant: ‘Black and Minority Ethnic Students Accessing Art and Design Courses’',
      organisation: 'The Glasgow School of Art',
      description: 'Literature Review.',
    },
    {
      years: '2013 – 2014',
      title: 'Research Assistant: ‘An analysis of Art & Design Office for Fair Access agreements’',
      organisation: 'The Glasgow School of Art',
      description: 'Literature Review.',
    },
    {
      years: '2008 – 2018',
      title: 'Founding Director',
      organisation: 'Q-Art',
      description:
        'In 10 years Q-Art partnered with 120 UK universities, museums, and galleries to publish 5 books and facilitate 70 crits, 80 workshops, and 8 symposia that shared approaches to teaching, learning, and evaluating contemporary fine art.',
    },
  ]

  const teachingRoles = [
    {
      years: '2025 – 2026',
      title: 'Occasional lecturer',
      organisation: 'Academy of Fine Arts, Uniarts Helsinki',
      description:
        'MA Fine Art; BA Contemporary Art History and Theory; and MA Praxis Curating and Writing in Contemporary Art.',
    },
    {
      years: '2020 – 2024',
      title: 'Postgraduate Teaching Assistant',
      organisation: 'Institute of Education, University College London',
      description: 'MA Art Education, Culture and Practice.',
    },
    {
      years: '2018 – 2024',
      title: 'Lecturer',
      organisation: 'Arts University Bournemouth',
      description: 'BA Fine Art (Contextual studies and Professional Practice).',
    },
    {
      years: '2018',
      title: 'Seminar Leader',
      organisation: 'University of Brighton',
      description: 'BA Fine Art Critical Practice (art institutions module).',
    },
  ]

  return {
    _id: 'employmentPage',
    _type: 'employmentPage',
    researchRoles: keyed('role', 'research', researchRoles),
    teachingRoles: keyed('role', 'teaching', teachingRoles),
  }
}

function contactPage() {
  return {
    _id: 'contactPage',
    _type: 'contactPage',
    intro: 'Use the form below to get in touch.',
  }
}

export function buildDocuments() {
  return [aboutPage(), qartPage(), researchPage(), employmentPage(), contactPage()]
}
