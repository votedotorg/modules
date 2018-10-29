const caVoterInfo = {
  kind: 'civicinfo#voterInfoResponse',
  election: {
    id: '6000',
    name: 'US 2018 Midterm Election',
    electionDay: '2018-11-06',
    ocdDivisionId: 'ocd-division/country:us'
  },
  normalizedInput: {
    line1: '2211 Mission Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94110'
  },
  pollingLocations: [
    {
      address: {
        locationName: '7906 -2248 Mission St',
        line1: '2248 Mission St',
        city: 'San Francisco',
        state: 'CA',
        zip: '94110'
      },
      notes: '',
      pollingHours: '',
      sources: [
        {
          name: 'Voting Information Project',
          official: true
        }
      ]
    }
  ],
  earlyVoteSites: [
    {
      address: {
        locationName: 'City Hall',
        line1: '1 Doctor Carlton B Goodlett Place',
        city: 'San Francisco',
        state: 'CA',
        zip: '94102'
      },
      notes: 'Room 48',
      pollingHours:
        'Tue, Oct 9: 8 am - 5 pm\nWed, Oct 10: 8 am - 5 pm\nThu, Oct 11: 8 am - 5 pm\nFri, Oct 12: 8 am - 5 pm\nMon, Oct 15: 8 am - 5 pm\nTue, Oct 16: 8 am - 5 pm\nWed, Oct 17: 8 am - 5 pm\nThu, Oct 18: 8 am - 5 pm\nFri, Oct 19: 8 am - 5 pm\nMon, Oct 22: 8 am - 5 pm\nTue, Oct 23: 8 am - 5 pm\nWed, Oct 24: 8 am - 5 pm\nThu, Oct 25: 8 am - 5 pm\nFri, Oct 26: 8 am - 5 pm\nSat, Oct 27: 10 am - 4 pm\nSun, Oct 28: 10 am - 4 pm\nMon, Oct 29: 8 am - 5 pm\nTue, Oct 30: 8 am - 5 pm\nWed, Oct 31: 8 am - 5 pm\nThu, Nov 1: 8 am - 5 pm\nFri, Nov 2: 8 am - 5 pm\nSat, Nov 3: 10 am - 4 pm\nSun, Nov 4: 10 am - 4 pm\nMon, Nov 5: 8 am - 5 pm',
      startDate: '2018-10-09',
      endDate: '2018-11-05',
      sources: [
        {
          name: 'DemocracyWorks',
          official: false
        }
      ]
    }
  ],
  contests: [
    {
      type: 'General',
      office: 'U.S. Senator',
      level: ['country'],
      roles: ['legislatorUpperBody'],
      district: {
        name: 'California',
        scope: 'statewide',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ca'
      },
      numberElected: '1',
      numberVotingFor: '1',
      candidates: [
        {
          name: 'Kevin de Leon',
          party: 'Democratic Party',
          phone: '(818) 850-6462',
          email: 'info@kevindeleon.com',
          channels: [
            {
              type: 'Twitter',
              id: 'https://twitter.com/kdeleon'
            }
          ]
        },
        {
          name: 'Dianne Feinstein',
          party: 'Democratic Party',
          phone: '(866) 747-2981',
          email: 'contact@feinsteinforca.com',
          channels: [
            {
              type: 'Twitter',
              id: 'https://twitter.com/SenFeinstein'
            }
          ]
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'U.S. Representative',
      level: ['country'],
      roles: ['legislatorLowerBody'],
      district: {
        name: "California's 12th congressional district",
        scope: 'congressional',
        id: '12',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ca/cd:12'
      },
      numberElected: '1',
      numberVotingFor: '1',
      candidates: [
        {
          name: 'Nancy Pelosi',
          party: 'Democratic Party',
          email: 'aguilar@pelosiforcongress.com',
          channels: [
            {
              type: 'Twitter',
              id: 'https://twitter.com/TeamPelosi'
            }
          ]
        },
        {
          name: 'Lisa Remmer',
          party: 'Republican Party',
          email: 'info@remmer4congress.com'
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'CA Governor',
      level: ['administrativeArea1'],
      roles: ['headOfGovernment'],
      district: {
        name: 'California',
        scope: 'statewide',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ca'
      },
      numberElected: '1',
      numberVotingFor: '1',
      candidates: [
        {
          name: 'Gavin Newsom',
          party: 'Democratic Party',
          phone: '(415) 326-4164',
          email: 'gavin@gavinnewsom.com',
          channels: [
            {
              type: 'Twitter',
              id: 'https://twitter.com/GavinNewsom'
            },
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/gavinnewsom'
            }
          ]
        },
        {
          name: 'John H. Cox',
          party: 'Republican Party',
          candidateUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/John_H._Cox.jpg/440px-John_H._Cox.jpg',
          channels: [
            {
              type: 'Twitter',
              id: 'https://twitter.com/TheRealJohnHCox'
            },
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/johncoxforgovernor'
            }
          ]
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'CA Lieutenant Governor',
      level: ['administrativeArea1'],
      roles: ['deputyHeadOfGovernment'],
      district: {
        name: 'California',
        scope: 'statewide',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ca'
      },
      numberElected: '1',
      numberVotingFor: '1',
      candidates: [
        {
          name: 'Ed Hernandez',
          party: 'Democratic Party',
          phone: '(626) 790-9241',
          email: 'info@edhernandez4ca.com',
          channels: [
            {
              type: 'Twitter',
              id: 'https://twitter.com/dredhernandez'
            }
          ]
        },
        {
          name: 'Eleni Kounalakis',
          party: 'Democratic Party',
          email: 'info@eleniforca.com',
          channels: [
            {
              type: 'Twitter',
              id: 'https://twitter.com/EleniForCA'
            }
          ]
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'CA Superintendent of Public Instruction',
      level: ['administrativeArea1'],
      roles: ['governmentOfficer'],
      district: {
        name: 'California',
        scope: 'statewide',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ca'
      },
      numberElected: '1',
      numberVotingFor: '1',
      candidates: [
        {
          name: 'Tony K. Thurmond',
          phone: '(510) 859-3241',
          email: 'tony@tonythurmond.com',
          channels: [
            {
              type: 'Twitter',
              id: 'https://twitter.com/TonyThurmond'
            }
          ]
        },
        {
          name: 'Marshall Tuck',
          phone: '(657) 229-3579',
          email: 'info@marshalltuck.com',
          channels: [
            {
              type: 'Twitter',
              id: 'https://twitter.com/MarshallTuck'
            }
          ]
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'CA State Insurance Commissioner',
      level: ['administrativeArea1'],
      roles: ['governmentOfficer'],
      district: {
        name: 'California',
        scope: 'statewide',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ca'
      },
      numberElected: '1',
      numberVotingFor: '1',
      candidates: [
        {
          name: 'Ricardo Lara',
          party: 'Democratic Party',
          phone: '(562) 427-2100',
          email: 'ricardo@ricardolara.com',
          channels: [
            {
              type: 'Twitter',
              id: 'https://twitter.com/RicardoLara4CA'
            }
          ]
        },
        {
          name: 'Steve Poizner',
          candidateUrl:
            'https://upload.wikimedia.org/wikipedia/commons/0/06/Steve_Poizner.jpg',
          email: 'slpoizner@gmail.com',
          channels: [
            {
              type: 'Twitter',
              id: 'https://twitter.com/StevePoizner'
            }
          ]
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'CA State Treasurer',
      level: ['administrativeArea1'],
      roles: ['governmentOfficer'],
      district: {
        name: 'California',
        scope: 'statewide',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ca'
      },
      numberElected: '1',
      numberVotingFor: '1',
      candidates: [
        {
          name: 'Fiona Ma',
          party: 'Democratic Party',
          candidateUrl: 'http://www.fionama.com',
          phone: '(916) 551-1891',
          email: 'fiona@fionama.com',
          channels: [
            {
              type: 'Twitter',
              id: 'https://twitter.com/fionama'
            },
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/ca.fionama'
            }
          ]
        },
        {
          name: 'Greg Conlon',
          party: 'Republican Party',
          candidateUrl: 'https://www.gregconlon.com/',
          channels: [
            {
              type: 'Twitter',
              id: 'https://twitter.com/GregConlon'
            }
          ]
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'CA Attorney General',
      level: ['administrativeArea1'],
      roles: ['governmentOfficer'],
      district: {
        name: 'California',
        scope: 'statewide',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ca'
      },
      numberElected: '1',
      numberVotingFor: '1',
      candidates: [
        {
          name: 'Xavier Becerra',
          party: 'Democratic Party',
          phone: '(213) 250-3400',
          email: 'xavier@xavierbecerra.com',
          channels: [
            {
              type: 'Twitter',
              id: 'https://twitter.com/XavierBecerra'
            }
          ]
        },
        {
          name: 'Steven C Bailey',
          party: 'Republican Party',
          candidateUrl:
            'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/34675001_2072790986325330_5485772443677097984_n.jpg?_nc_cat=0&oh=c4a2ccd0d07f51cdf12106dbe60a2e00&oe=5BAE5B66',
          email: 'info@baileyforag.com',
          channels: [
            {
              type: 'Twitter',
              id: 'https://twitter.com/BaileyForAG'
            }
          ]
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'CA Secretary of State',
      level: ['administrativeArea1'],
      roles: ['governmentOfficer'],
      district: {
        name: 'California',
        scope: 'statewide',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ca'
      },
      numberElected: '1',
      numberVotingFor: '1',
      candidates: [
        {
          name: 'Alex Padilla',
          party: 'Democratic Party',
          phone: '(213) 452-6565',
          email: 'alex@alex-padilla.com',
          channels: [
            {
              type: 'Twitter',
              id: 'https://twitter.com/AlexPadilla4CA'
            },
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/alexpadilla4ca'
            }
          ]
        },
        {
          name: 'Mark P. Meuser',
          party: 'Republican Party',
          phone: '(209) 763-8737',
          email: 'contact@markmeuser.com',
          channels: [
            {
              type: 'Twitter',
              id: 'https://twitter.com/MarkMeuser'
            }
          ]
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'CA State Controller',
      level: ['administrativeArea1'],
      roles: ['governmentOfficer'],
      district: {
        name: 'California',
        scope: 'statewide',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ca'
      },
      numberElected: '1',
      numberVotingFor: '1',
      candidates: [
        {
          name: 'Betty T. Yee',
          party: 'Democratic Party',
          phone: '(818) 884-1818',
          email: 'info@bettyyee.com',
          channels: [
            {
              type: 'Twitter',
              id: 'https://twitter.com/BettyYeeforCA'
            }
          ]
        },
        {
          name: 'Konstantinos Roditis',
          party: 'Republican Party',
          phone: '(949) 607-8294',
          email: 'roditis@cacontroller.com',
          channels: [
            {
              type: 'Twitter',
              id: 'https://twitter.com/KonRoditis'
            }
          ]
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'Referendum',
      ballotTitle: 'Proposition 1',
      district: {
        name: 'California',
        scope: 'statewide',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ca'
      },
      referendumTitle: 'Proposition 1',
      referendumSubtitle:
        'Authorizes Bonds To Fund Specified Housing Assistance Programs. Legislative Statute.',
      referendumText:
        'Authorizes $4 billion in general obligation bonds for existing affordable housing programs for low-income residents, veterans, farmworkers, manufactured and mobile homes, infill, and transit-oriented housing. Fiscal Impact: Increased state costs to repay bonds averaging about $170 million annually over the next 35 years.',
      referendumBallotResponses: ['Yes', 'No'],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'Referendum',
      ballotTitle: 'Proposition 10',
      district: {
        name: 'California',
        scope: 'statewide',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ca'
      },
      referendumTitle: 'Proposition 10',
      referendumSubtitle:
        'Expands Local Governments’ Authority To Enact Rent Control On Residential Property. Initiative Statute.',
      referendumText:
        'Repeals state law that currently restricts the scope of rent-control policies that cities and other local jurisdictions may impose on residential property. Fiscal Impact: Potential net reduction in state and local revenues of tens of millions of dollars per year in the long term. Depending on actions by local communities, revenue losses could be less or considerably more.',
      referendumBallotResponses: ['Yes', 'No'],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'Referendum',
      ballotTitle: 'Proposition 11',
      district: {
        name: 'California',
        scope: 'statewide',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ca'
      },
      referendumTitle: 'Proposition 11',
      referendumSubtitle:
        'Requires Private-Sector Emergency Ambulance Employees To Remain On-Call During Work Breaks. Eliminates Certain Employer Liability. Initiative Statute.',
      referendumText:
        'Law entitling hourly employees to breaks without being on-call would not apply to private-sector ambulance employees. Fiscal Impact: Likely fiscal benefit to local governments (in the form of lower costs and higher revenues), potentially in the tens of millions of dollars each year.',
      referendumBallotResponses: ['Yes', 'No'],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'Referendum',
      ballotTitle: 'Proposition 12',
      district: {
        name: 'California',
        scope: 'statewide',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ca'
      },
      referendumTitle: 'Proposition 12',
      referendumSubtitle:
        'Establishes New Standards For Confinement Of Specified Farm Animals; Bans Sale Of Noncomplying Products. Initiative Statute.',
      referendumText:
        'Establishes minimum requirements for confining certain farm animals. Prohibits sales of meat and egg products from animals confined in noncomplying manner. Fiscal Impact: Potential decrease in state income tax revenues from farm businesses, likely not more than several million dollars annually. State costs up to $10 million annually to enforce the measure.',
      referendumBallotResponses: ['Yes', 'No'],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'Referendum',
      ballotTitle: 'Proposition 2',
      district: {
        name: 'California',
        scope: 'statewide',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ca'
      },
      referendumTitle: 'Proposition 2',
      referendumSubtitle:
        'Authorizes Bonds To Fund Existing Housing Program For Individuals With Mental Illness. Legislative Statute.',
      referendumText:
        'Amends Mental Health Services Act to fund No Place Like Home Program, which finances housing for individuals with mental illness. Ratifies existing law establishing the No Place Like Home Program. Fiscal Impact: Allows the state to use up to $140 million per year of county mental health funds to repay up to $2 billion in bonds. These bonds would fund housing for those with mental illness who are homeless.',
      referendumBallotResponses: ['Yes', 'No'],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'Referendum',
      ballotTitle: 'Proposition 3',
      district: {
        name: 'California',
        scope: 'statewide',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ca'
      },
      referendumTitle: 'Proposition 3',
      referendumBrief:
        'Authorizes Bonds To Fund Projects For Water Supply And Quality, Watershed, Fish, Wildlife, Water Conveyance, And Groundwater Sustainability And Storage. Initiative Statute.',
      referendumText:
        'Authorizes $8.877 billion in state general obligation bonds for various infrastructure projects. Fiscal Impact: Increased state costs to repay bonds averaging $430 million per year over 40 years. Local government savings for water-related projects, likely averaging a couple hundred million dollars annually over the next few decades.',
      referendumBallotResponses: ['Yes', 'No'],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'Referendum',
      ballotTitle: 'Proposition 4',
      district: {
        name: 'California',
        scope: 'statewide',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ca'
      },
      referendumTitle: 'Proposition 4',
      referendumSubtitle:
        'Authorizes Bonds Funding Construction At Hospitals Providing Children’s Health Care. Initiative Statute.',
      referendumText:
        "Authorizes $1.5 billion in bonds, to be repaid from state's General Fund, to fund grants for construction, expansion, renovation, and equipping of qualifying children's hospitals. Fiscal Impact: Increased state costs to repay bonds averaging about $80 million annually over the next 35 years.",
      referendumBallotResponses: ['Yes', 'No'],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'Referendum',
      ballotTitle: 'Proposition 5',
      district: {
        name: 'California',
        scope: 'statewide',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ca'
      },
      referendumTitle: 'Proposition 5',
      referendumSubtitle:
        'Changes Requirements For Certain Property Owners To Transfer Their Property Tax Base To Replacement Property. Initiative Constitutional Amendment And Statute.',
      referendumText:
        'Removes certain transfer requirements for homeowners over 55, severely disabled homeowners, and contaminated or disaster-destroyed property. Fiscal Impact: Schools and local governments each would lose over $100 million in annual property taxes early on, growing to about $1 billion per year. Similar increase in state costs to backfill school property tax losses.',
      referendumBallotResponses: ['Yes', 'No'],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'Referendum',
      ballotTitle: 'Proposition 6',
      district: {
        name: 'California',
        scope: 'statewide',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ca'
      },
      referendumTitle: 'Proposition 6',
      referendumBrief:
        'Eliminates Certain Road Repair And Transportation Funding. Requires Certain Fuel Taxes And Vehicle Fees Be Approved By The Electorate. Initiative Constitutional Amendment.',
      referendumText:
        "Repeals a 2017 transportation law's taxes and fees designated for road repairs and public transportation. Fiscal Impact: Reduced ongoing revenues of $5.1 billion from state fuel and vehicle taxes that mainly would have paid for highway and road maintenance and repairs, as well as transit programs.",
      referendumBallotResponses: ['Yes', 'No'],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'Referendum',
      ballotTitle: 'Proposition 7',
      district: {
        name: 'California',
        scope: 'statewide',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ca'
      },
      referendumTitle: 'Proposition 7',
      referendumSubtitle:
        'Conforms California Daylight Saving Time To Federal Law. Allows Legislature To Change Daylight Saving Time Period. Legislative Statute.',
      referendumText:
        'Gives Legislature ability to change daylight savings time period by two-thirds vote, if changes are consistent with federal law. Fiscal Impact: This measure has no direct fiscal effect because changes to daylight savings time would depend on future actions by the Legislature and potentially the federal government.',
      referendumBallotResponses: ['Yes', 'No'],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'Referendum',
      ballotTitle: 'Proposition 8',
      district: {
        name: 'California',
        scope: 'statewide',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ca'
      },
      referendumTitle: 'Proposition 8',
      referendumSubtitle:
        'Regulates Amounts Outpatient Kidney Dialysis Clinics Charge For Dialysis Treatment. Initiative Statute.',
      referendumText:
        'Requires rebates and penalties if charges exceed limit. Requires annual reporting to the state. Prohibits clinics from refusing to treat patients based on payment source. Fiscal Impact: Overall annual effect on state and local governments ranging from net positive impact in the low tens of millions of dollars to net negative impact in the tens of millions of dollars.',
      referendumBallotResponses: ['Yes', 'No'],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    }
  ]
}

const nyVoterInfo = {
  kind: 'civicinfo#voterInfoResponse',
  election: {
    id: '2000',
    name: 'VIP Test Election',
    electionDay: '2021-06-06',
    ocdDivisionId: 'ocd-division/country:us'
  },
  normalizedInput: {
    line1: '142 Prospect Park West',
    city: 'New York',
    state: 'NY',
    zip: '11215'
  },
  pollingLocations: [
    {
      address: {
        locationName: 'PS 107',
        line1: '1301 8 Avenue',
        city: 'Brooklyn',
        state: 'NY',
        zip: '11215'
      },
      notes: '',
      pollingHours: '',
      sources: [
        {
          name: 'Voting Information Project',
          official: true
        }
      ]
    }
  ],
  contests: [
    {
      type: 'General',
      office: 'US Congress District 9',
      level: ['country'],
      roles: ['legislatorLowerBody'],
      district: {
        name: "New York's 9th congressional district",
        scope: 'congressional',
        id: 'ocd-division/country:us/state:ny/cd:9',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ny/cd:9'
      },
      candidates: [
        {
          name: 'Yvette D. Clarke',
          party: 'Democratic',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/clarkeforcongress'
            }
          ]
        },
        {
          name: 'Daniel J. Cavanagh',
          party: 'Conservative'
        },
        {
          name: 'Yvette D. Clarke',
          party: 'Working Families',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/clarkeforcongress'
            }
          ]
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'Governor',
      level: ['administrativeArea1'],
      roles: ['headOfGovernment'],
      district: {
        name: 'New York',
        scope: 'statewide',
        id: 'ocd-division/country:us/state:ny',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ny'
      },
      candidates: [
        {
          name: 'Andrew Cuomo',
          party: 'Democratic',
          candidateUrl: 'http://andrewcuomo.com/',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/andrewcuomo'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/TeamCuomo'
            },
            {
              type: 'GooglePlus',
              id: 'https://plus.google.com/112017188719048356723'
            },
            {
              type: 'YouTube',
              id: 'https://www.youtube.com/channel/UC0uUriiTlN_RxMD-GBOTa-Q'
            }
          ]
        },
        {
          name: 'Andrew Cuomo',
          party: 'Working Families',
          candidateUrl: 'http://andrewcuomo.com/',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/andrewcuomo'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/TeamCuomo'
            },
            {
              type: 'GooglePlus',
              id: 'https://plus.google.com/112017188719048356723'
            },
            {
              type: 'YouTube',
              id: 'https://www.youtube.com/channel/UC0uUriiTlN_RxMD-GBOTa-Q'
            }
          ]
        },
        {
          name: 'Andrew Cuomo',
          party: "Women's Equality",
          candidateUrl: 'http://andrewcuomo.com/',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/andrewcuomo'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/TeamCuomo'
            },
            {
              type: 'GooglePlus',
              id: 'https://plus.google.com/112017188719048356723'
            },
            {
              type: 'YouTube',
              id: 'https://www.youtube.com/channel/UC0uUriiTlN_RxMD-GBOTa-Q'
            }
          ]
        },
        {
          name: 'Andrew Cuomo',
          party: 'Independence',
          candidateUrl: 'http://andrewcuomo.com/',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/andrewcuomo'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/TeamCuomo'
            },
            {
              type: 'GooglePlus',
              id: 'https://plus.google.com/112017188719048356723'
            },
            {
              type: 'YouTube',
              id: 'https://www.youtube.com/channel/UC0uUriiTlN_RxMD-GBOTa-Q'
            }
          ]
        },
        {
          name: 'Rob Astorino',
          party: 'Republican',
          candidateUrl: 'http://www.robastorino.com/',
          phone: '(914) 481-3672',
          email: 'info@robastorino.com',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/RobAstorino'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/RobAstorino'
            },
            {
              type: 'YouTube',
              id: 'https://www.youtube.com/user/RobAstorino'
            }
          ]
        },
        {
          name: 'Rob Astorino',
          party: 'Conservative',
          candidateUrl: 'http://www.robastorino.com/',
          phone: '(914) 481-3672',
          email: 'info@robastorino.com',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/RobAstorino'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/RobAstorino'
            },
            {
              type: 'YouTube',
              id: 'https://www.youtube.com/user/RobAstorino'
            }
          ]
        },
        {
          name: 'Rob Astorino',
          party: 'StopCommonCore',
          candidateUrl: 'http://www.robastorino.com/',
          phone: '(914) 481-3672',
          email: 'info@robastorino.com',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/RobAstorino'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/RobAstorino'
            },
            {
              type: 'YouTube',
              id: 'https://www.youtube.com/user/RobAstorino'
            }
          ]
        },
        {
          name: 'Howie Hawkins',
          party: 'Green',
          candidateUrl: 'http://www.howiehawkins.org/',
          phone: '(315) 701-1592',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/HawkinsforNYGovernor'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/HowieHawkins'
            }
          ]
        },
        {
          name: 'Michael McDermott',
          party: 'Libertarian',
          candidateUrl: 'http://www.mcdermottforcongress2014.com/',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/Mcdermottforgovernor'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/votemcdermott'
            },
            {
              type: 'YouTube',
              id: 'https://www.youtube.com/channel/UCPE3CIMzPUjwQlbe8mU7SVg'
            }
          ]
        },
        {
          name: 'Steven Cohn',
          party: 'Sapient',
          candidateUrl: 'http://sapientparty.com/',
          phone: '(516) 586-8024',
          email: 'Info@sapientparty.com',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/sapientparty'
            }
          ]
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'Lt. Governor',
      level: ['administrativeArea1'],
      roles: ['deputyHeadOfGovernment'],
      district: {
        name: 'New York',
        scope: 'statewide',
        id: 'ocd-division/country:us/state:ny',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ny'
      },
      candidates: [
        {
          name: 'Kathy Hochul',
          party: 'Democratic',
          candidateUrl: 'http://kathyhochul.com/',
          phone: '(212) 551-9441',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/KathyHochul'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/KathyHochul'
            }
          ]
        },
        {
          name: 'Kathy Hochul',
          party: 'Working Families',
          candidateUrl: 'http://kathyhochul.com/',
          phone: '(212) 551-9441',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/KathyHochul'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/KathyHochul'
            }
          ]
        },
        {
          name: 'Kathy Hochul',
          party: 'Independence',
          candidateUrl: 'http://kathyhochul.com/',
          phone: '(212) 551-9441',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/KathyHochul'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/KathyHochul'
            }
          ]
        },
        {
          name: 'Kathy Hochul',
          party: "Women's Equality",
          candidateUrl: 'http://kathyhochul.com/',
          phone: '(212) 551-9441',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/KathyHochul'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/KathyHochul'
            }
          ]
        },
        {
          name: 'Chris Moss',
          party: 'Republican',
          candidateUrl: 'http://albanygop.org/?page_id=766',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/ChrisMossForSheriff'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/SheriffMoss'
            }
          ]
        },
        {
          name: 'Chris Moss',
          party: 'Conservative',
          candidateUrl: 'http://albanygop.org/?page_id=766',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/ChrisMossForSheriff'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/SheriffMoss'
            }
          ]
        },
        {
          name: 'Chris Moss',
          party: 'StopCommonCore',
          candidateUrl: 'http://albanygop.org/?page_id=766',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/ChrisMossForSheriff'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/SheriffMoss'
            }
          ]
        },
        {
          name: 'Brian Jones',
          party: 'Green',
          candidateUrl: 'http://www.howiehawkins.org/about_brian_jones'
        },
        {
          name: 'Chris Edes',
          party: 'Libertarian',
          candidateUrl: 'http://www.vote-for-chris.net/',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/ChrisEdesForGovernor'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/ChrisEdesVote4'
            },
            {
              type: 'YouTube',
              id: 'https://www.youtube.com/channel/UCKg5VxlNPLlSoOzogCzOBCQ'
            }
          ]
        },
        {
          name: 'Bobby K Kalotee',
          party: 'Sapient',
          candidateUrl: 'http://sapientparty.com/',
          email: 'Info@sapientparty.com',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/sapientparty'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/sapientparty'
            }
          ]
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'Comptroller',
      level: ['administrativeArea1'],
      roles: ['governmentOfficer'],
      district: {
        name: 'New York',
        scope: 'statewide',
        id: 'ocd-division/country:us/state:ny',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ny'
      },
      candidates: [
        {
          name: 'Thomas DiNapoli',
          party: 'Democratic',
          candidateUrl: 'http://dinapoli2014.com/',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/Thomas.P.DiNapoli'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/tomdinapoli'
            }
          ]
        },
        {
          name: 'Thomas DiNapoli',
          party: 'Working Families',
          candidateUrl: 'http://dinapoli2014.com/',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/Thomas.P.DiNapoli'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/tomdinapoli'
            }
          ]
        },
        {
          name: 'Thomas DiNapoli',
          party: "Women's Equality",
          candidateUrl: 'http://dinapoli2014.com/',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/Thomas.P.DiNapoli'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/tomdinapoli'
            }
          ]
        },
        {
          name: 'Thomas DiNapoli',
          party: 'Independence',
          candidateUrl: 'http://dinapoli2014.com/',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/Thomas.P.DiNapoli'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/tomdinapoli'
            }
          ]
        },
        {
          name: 'Robert Antonacci',
          party: 'Republican',
          candidateUrl: 'http://www.bobantonacci.com/',
          phone: '(315) 399-5589',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/bobantonacci1'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/antonaccicpa'
            },
            {
              type: 'GooglePlus',
              id: 'https://plus.google.com/100828682008620091053'
            },
            {
              type: 'YouTube',
              id: 'https://www.youtube.com/user/AntonacciCPA'
            }
          ]
        },
        {
          name: 'Robert Antonacci',
          party: 'Conservative',
          candidateUrl: 'http://www.bobantonacci.com/',
          phone: '(315) 399-5589',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/bobantonacci1'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/antonaccicpa'
            },
            {
              type: 'GooglePlus',
              id: 'https://plus.google.com/100828682008620091053'
            },
            {
              type: 'YouTube',
              id: 'https://www.youtube.com/user/AntonacciCPA'
            }
          ]
        },
        {
          name: 'Robert Antonacci',
          party: 'StopCommonCore',
          candidateUrl: 'http://www.bobantonacci.com/',
          phone: '(315) 399-5589',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/bobantonacci1'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/antonaccicpa'
            },
            {
              type: 'GooglePlus',
              id: 'https://plus.google.com/100828682008620091053'
            },
            {
              type: 'YouTube',
              id: 'https://www.youtube.com/user/AntonacciCPA'
            }
          ]
        },
        {
          name: 'Theresa Portelli',
          party: 'Green',
          candidateUrl: 'http://theresaportelli.info/',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/TheresaPortelliForNYSComptroller'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/Theresa4Comp'
            }
          ]
        },
        {
          name: 'John Clifton',
          party: 'Libertarian',
          candidateUrl: 'http://electclifton.wordpress.com/',
          phone: '347-869-1729',
          email: 'electclifton@spamarrest.com'
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'Attorney General',
      level: ['administrativeArea1'],
      roles: ['governmentOfficer'],
      district: {
        name: 'New York',
        scope: 'statewide',
        id: 'ocd-division/country:us/state:ny',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ny'
      },
      candidates: [
        {
          name: 'Eric Schneiderman',
          party: 'Democratic',
          candidateUrl: 'http://ericschneiderman.com/',
          phone: '(212) 238-3270',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/SchneidermanNY'
            }
          ]
        },
        {
          name: 'Eric Schneiderman',
          party: 'Working Families',
          candidateUrl: 'http://ericschneiderman.com/',
          phone: '(212) 238-3270',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/SchneidermanNY'
            }
          ]
        },
        {
          name: 'Eric Schneiderman',
          party: "Women's Equality",
          candidateUrl: 'http://ericschneiderman.com/',
          phone: '(212) 238-3270',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/SchneidermanNY'
            }
          ]
        },
        {
          name: 'Eric Schneiderman',
          party: 'Independence',
          candidateUrl: 'http://ericschneiderman.com/',
          phone: '(212) 238-3270',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/SchneidermanNY'
            }
          ]
        },
        {
          name: 'John Cahill',
          party: 'Republican',
          candidateUrl: 'http://cahillforag.com/',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/CahillForAG'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/CahillForAG'
            },
            {
              type: 'GooglePlus',
              id: 'https://plus.google.com/117497861802291845704'
            },
            {
              type: 'YouTube',
              id: 'https://www.youtube.com/channel/UCTxv-EN0gmTEUCCX6f7hcFQ'
            }
          ]
        },
        {
          name: 'John Cahill',
          party: 'Conservative',
          candidateUrl: 'http://cahillforag.com/',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/CahillForAG'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/CahillForAG'
            },
            {
              type: 'GooglePlus',
              id: 'https://plus.google.com/117497861802291845704'
            },
            {
              type: 'YouTube',
              id: 'https://www.youtube.com/channel/UCTxv-EN0gmTEUCCX6f7hcFQ'
            }
          ]
        },
        {
          name: 'John Cahill',
          party: 'StopCommonCore',
          candidateUrl: 'http://cahillforag.com/',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/CahillForAG'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/CahillForAG'
            },
            {
              type: 'GooglePlus',
              id: 'https://plus.google.com/117497861802291845704'
            },
            {
              type: 'YouTube',
              id: 'https://www.youtube.com/channel/UCTxv-EN0gmTEUCCX6f7hcFQ'
            }
          ]
        },
        {
          name: 'Ramon Jimenez',
          party: 'Green',
          candidateUrl: 'http://ramonjjimenez.wordpress.com/',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/JimenezForAG'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/jimenezforag'
            }
          ]
        },
        {
          name: 'Carl Person',
          party: 'Libertarian',
          candidateUrl: 'http://carl4ag.com/',
          phone: '212-307-0247',
          channels: [
            {
              type: 'Twitter',
              id: 'https://twitter.com/carlperson'
            },
            {
              type: 'YouTube',
              id: 'https://www.youtube.com/channel/UCIkGkxIegkSN_TfetZ4C9bw'
            }
          ]
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'State Senate, District 21',
      level: ['administrativeArea1'],
      roles: ['legislatorUpperBody'],
      district: {
        name: 'New York State Senate district 21',
        scope: 'stateUpper',
        id: 'ocd-division/country:us/state:ny/sldu:21',
        kgForeignKey:
          '/authority/civics/ocd-division/country:us/state:ny/sldu:21'
      },
      candidates: [
        {
          name: 'Kevin S. Parker',
          party: 'Democratic',
          candidateUrl: 'http://www.kevinparker.org/',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/24988756132'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/senatorparker'
            }
          ]
        },
        {
          name: 'Herman G. Hall',
          party: 'Conservative'
        },
        {
          name: 'Kevin Parker',
          party: 'Working Families',
          candidateUrl: 'http://www.kevinparker.org/',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/24988756132'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/senatorparker'
            }
          ]
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'State Assembly, District 44',
      level: ['administrativeArea1'],
      roles: ['legislatorLowerBody'],
      district: {
        name: 'New York Assembly district 44',
        scope: 'stateLower',
        id: 'ocd-division/country:us/state:ny/sldl:44',
        kgForeignKey:
          '/authority/civics/ocd-division/country:us/state:ny/sldl:44'
      },
      candidates: [
        {
          name: 'James F. Brennan',
          party: 'Democratic'
        },
        {
          name: 'Mikhail Yusupov',
          party: 'Republican'
        },
        {
          name: 'Mikhail Yusupov',
          party: 'Conservative'
        },
        {
          name: 'James F. Brennan',
          party: 'Working Families'
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'Supreme Court Justice, District 2',
      level: ['administrativeArea1'],
      roles: ['highestCourtJudge'],
      district: {
        name: 'NY State Supreme Court - 2nd District',
        scope: 'judicial',
        id: 'ocd-division/country:us/state:ny/supreme_court:2',
        kgForeignKey:
          '/authority/civics/ocd-division/country:us/state:ny/supreme_court:2'
      },
      candidates: [
        {
          name: 'Evelyn J. Laporte',
          party: 'Democratic'
        },
        {
          name: 'Wavny Toussaint',
          party: 'Democratic'
        },
        {
          name: 'Kathy J. King',
          party: 'Democratic'
        },
        {
          name: 'Lara J. Genovesi',
          party: 'Democratic'
        },
        {
          name: 'Philip J. Smallman',
          party: 'Conservative'
        },
        {
          name: 'Anthony R. Caccamo',
          party: 'Conservative'
        },
        {
          name: 'Matthew A. Doheny',
          party: 'Conservative'
        },
        {
          name: 'Dennis W. Houdek',
          party: 'Conservative'
        },
        {
          name: 'Kenneth D. Schaeffer',
          party: 'Working Families'
        },
        {
          name: 'Kevin R. Bryant, Sr.',
          party: 'Working Families'
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'Primary',
      office: 'City Council District 39',
      district: {
        name: 'CC 39',
        scope: 'cityCouncil',
        id: '39'
      },
      sources: [
        {
          name: 'Voting Information Project',
          official: true
        }
      ]
    },
    {
      type: 'Referendum',
      district: {
        name: 'New York',
        scope: 'statewide',
        id: 'ocd-division/country:us/state:ny',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ny'
      },
      referendumTitle: 'PROPOSAL NUMBER ONE, AN AMENDMENT',
      referendumSubtitle: "Revising State's Redistricting Procedure",
      referendumUrl: 'http://www.elections.ny.gov/ProposedConsAmendments.html',
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'Referendum',
      district: {
        name: 'New York',
        scope: 'statewide',
        id: 'ocd-division/country:us/state:ny',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ny'
      },
      referendumTitle: 'PROPOSAL NUMBER THREE, A PROPOSITION',
      referendumSubtitle: 'SMART SCHOOLS BOND ACT OF 2014',
      referendumUrl: 'http://www.elections.ny.gov/ProposedConsAmendments.html',
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'Referendum',
      district: {
        name: 'New York',
        scope: 'statewide',
        id: 'ocd-division/country:us/state:ny',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:ny'
      },
      referendumTitle: 'PROPOSAL NUMBER TWO, AN AMENDMENT',
      referendumSubtitle:
        'Permitting Electronic Distribution of State Legislative Bills',
      referendumUrl: 'http://www.elections.ny.gov/ProposedConsAmendments.html',
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    }
  ],
  state: [
    {
      name: 'New York',
      electionAdministrationBody: {
        name: 'New York State Board of Elections',
        electionInfoUrl: 'http://www.elections.ny.gov/',
        votingLocationFinderUrl:
          'https://voterlookup.elections.state.ny.us/votersearch.aspx',
        correspondenceAddress: {
          line1: '40 North Pearl St.',
          city: 'Albany',
          state: 'New York',
          zip: '12207-2729'
        }
      },
      local_jurisdiction: {
        name: 'Kings County',
        electionAdministrationBody: {
          electionInfoUrl:
            'http://www.elections.ny.gov:8080/plsql_browser/county_boards?county_in=Kings',
          physicalAddress: {
            line1: '345 ADAMS ST FL 4',
            city: 'BROOKLYN',
            state: 'NY',
            zip: '11201-3719'
          },
          electionOfficials: [
            {
              officePhoneNumber: '(718) 797-8800',
              emailAddress: 'voterreg@boe.ny.us'
            }
          ]
        },
        sources: [
          {
            name: 'DemocracyWorks',
            official: false
          }
        ]
      },
      sources: [
        {
          name: '',
          official: false
        }
      ]
    }
  ]
}

const nvVoterInfo = {
  kind: 'civicinfo#voterInfoResponse',
  election: {
    id: '2000',
    name: 'VIP Test Election',
    electionDay: '2021-06-06',
    ocdDivisionId: 'ocd-division/country:us'
  },
  normalizedInput: {
    line1: '685 Tasker Way',
    city: 'Sparks',
    state: 'NV',
    zip: '89431'
  },
  pollingLocations: [
    {
      address: {
        locationName: 'Sparks Christian Fellowship',
        line1: '510 Greenbrae Dr',
        city: 'Sparks',
        state: 'NV',
        zip: '00000'
      },
      notes: '',
      pollingHours: '',
      sources: [
        {
          name: 'Voting Information Project',
          official: true
        }
      ]
    }
  ],
  contests: [
    {
      type: 'General',
      office: 'US House of Representatives, District 2',
      level: ['country'],
      roles: ['legislatorLowerBody'],
      district: {
        name: "Nevada's 2nd congressional district",
        scope: 'congressional',
        id: 'ocd-division/country:us/state:nv/cd:2',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:nv/cd:2'
      },
      candidates: [
        {
          name: 'Mark E. Amodei',
          party: 'Republican',
          candidateUrl: 'http://amodeifornevada.com',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/AmodeiForNevada'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/NVGOP'
            },
            {
              type: 'YouTube',
              id: 'https://www.youtube.com/channel/UCpS52gyDpQ4Z-Vylv_ICqpw'
            }
          ]
        },
        {
          name: 'Janine Hansen',
          party: 'Independent American',
          candidateUrl: 'http://www.janinehansen.com/',
          email: 'janine@janinehansen.com'
        },
        {
          name: 'Kristen Spees',
          party: 'Democratic',
          candidateUrl: 'http://kristenforcongress.wordpress.com/',
          email: 'kcspees@yahoo.com',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/Kristenforcongress'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/KristenSpees'
            },
            {
              type: 'YouTube',
              id: 'https://www.youtube.com/user/kcspees'
            }
          ]
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'Governor',
      level: ['administrativeArea1'],
      roles: ['headOfGovernment'],
      district: {
        name: 'Nevada',
        scope: 'statewide',
        id: 'ocd-division/country:us/state:nv',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:nv'
      },
      candidates: [
        {
          name: 'Robert "Bob" Goodman',
          party: 'Democratic',
          candidateUrl: 'http://www.goodman4nevada.com/',
          phone: '702-913-6581',
          email: 'goodman4nevada@gmail.com',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/1433922460180503'
            }
          ]
        },
        {
          name: 'Brian Sandoval',
          party: 'Republican',
          phone: '702-228-2014',
          email: 'info@briansandoval.com',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/BrianSandoval'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/BrianSandoval'
            },
            {
              type: 'GooglePlus',
              id: 'https://plus.google.com/104948260285352423178'
            },
            {
              type: 'YouTube',
              id: 'https://www.youtube.com/user/briansandoval'
            }
          ]
        },
        {
          name: 'David Lory VanDerBeek',
          party: 'Independent American',
          candidateUrl: 'http://nevadagovernor2014.com/',
          phone: '(702) 274-1571',
          email: 'david@nevadagovernor2014.com',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/DavidLoryVanDerBeek'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/USFamilyMan'
            },
            {
              type: 'GooglePlus',
              id: 'https://plus.google.com/+DavidLoryVanDerBeek'
            },
            {
              type: 'YouTube',
              id: 'https://www.youtube.com/user/davidlory'
            }
          ]
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'Lieutenant Governor',
      level: ['administrativeArea1'],
      roles: ['deputyHeadOfGovernment'],
      district: {
        name: 'Nevada',
        scope: 'statewide',
        id: 'ocd-division/country:us/state:nv',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:nv'
      },
      candidates: [
        {
          name: 'Lucy Flores',
          party: 'Democratic',
          candidateUrl: 'http://www.lucyflores.com/',
          phone: '(702) 437-0587',
          email: 'lucy@lucyflores.com',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/LucyFloresNV'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/LucyFlores'
            }
          ]
        },
        {
          name: 'Mark Hutchison',
          party: 'Republican',
          candidateUrl: 'http://www.hutch4nevada.com/',
          phone: '(702) 233-2049',
          email: 'mark@hutch4nevada.com',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/hutch4nevada'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/hutch4nevada'
            },
            {
              type: 'YouTube',
              id: 'https://www.youtube.com/channel/UCZsYO3yQy2beVJYqsSD2r0w'
            }
          ]
        },
        {
          name: 'Mike Little',
          party: 'Independent American',
          candidateUrl: 'http://votemikelittle.com/',
          phone: '702-826-1560',
          email: 'landfillalternativecorp@gmail.com'
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'State Treasurer',
      level: ['administrativeArea1'],
      roles: ['governmentOfficer'],
      district: {
        name: 'Nevada',
        scope: 'statewide',
        id: 'ocd-division/country:us/state:nv',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:nv'
      },
      candidates: [
        {
          name: 'Kress K. Cave',
          party: 'Independent American',
          phone: '775-883-7700'
        },
        {
          name: 'Dan Schwartz',
          party: 'Republican',
          candidateUrl: 'http://www.dan4nevada.com/',
          phone: '775-420-3004',
          email: 'dan@dan4nevada.com',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/DanForNevada'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/Dan4Nevada'
            }
          ]
        },
        {
          name: 'Kim Wallin',
          party: 'Democratic',
          candidateUrl: 'http://www.kimwallin.org/',
          phone: '702-423-2400',
          email: 'friendsofkimwallin@gmail.com',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/kimwallinNevadaT2014'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/kim4nvtreasurer'
            },
            {
              type: 'GooglePlus',
              id: 'https://plus.google.com/100314072305644879589'
            },
            {
              type: 'YouTube',
              id: 'https://www.youtube.com/channel/UCGu0rx9J5h_kiQ0nUGwqQdg'
            }
          ]
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'Attorney General',
      level: ['administrativeArea1'],
      roles: ['governmentOfficer'],
      district: {
        name: 'Nevada',
        scope: 'statewide',
        id: 'ocd-division/country:us/state:nv',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:nv'
      },
      candidates: [
        {
          name: 'Jonathan J. Hansen',
          party: 'Independent American',
          candidateUrl: 'http://www.iapn.org/',
          email: 'jonathanh@hrnvlaw.com'
        },
        {
          name: 'Adam Paul Laxalt',
          party: 'Republican',
          phone: '(702) 956-0222',
          email: 'swati@adamlaxaltforag.com',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/adam.laxalt'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/adamlaxalt'
            },
            {
              type: 'GooglePlus',
              id: 'https://plus.google.com/115917396327729429534'
            },
            {
              type: 'YouTube',
              id: 'https://www.youtube.com/channel/UCwkp1fomOqvVdk7riX5qA7Q'
            }
          ]
        },
        {
          name: 'Ross Miller',
          party: 'Democratic',
          candidateUrl: 'http://rossmiller.org/',
          phone: '702-370-4596',
          email: 'contact@rossmiller.org',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/electrossmiller'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/rossjmiller'
            },
            {
              type: 'GooglePlus',
              id: 'https://plus.google.com/102494971810014652903'
            },
            {
              type: 'YouTube',
              id: 'https://www.youtube.com/channel/UCCyPNzszlChi8iV0Fin3jPw'
            }
          ]
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'State Controller',
      level: ['administrativeArea1'],
      roles: ['governmentOfficer'],
      district: {
        name: 'Nevada',
        scope: 'statewide',
        id: 'ocd-division/country:us/state:nv',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:nv'
      },
      candidates: [
        {
          name: 'Tom Jones',
          party: 'Independent American',
          candidateUrl: 'http://www.electtomjones.com/',
          phone: '702-979-3427',
          email: 'tom@tomjones.com'
        },
        {
          name: 'Ron Knecht',
          party: 'Republican',
          candidateUrl: 'http://www.ronknecht.com/',
          email: 'ronknecht@aol.com'
        },
        {
          name: 'Andrew Martin',
          party: 'Democratic',
          candidateUrl: 'http://www.martinfornevada.com/',
          phone: '702-724-8349',
          email: 'andrew@martinfornevada.com',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/MartinForNevada'
            }
          ]
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'Secretary of State',
      level: ['administrativeArea1'],
      roles: ['governmentOfficer'],
      district: {
        name: 'Nevada',
        scope: 'statewide',
        id: 'ocd-division/country:us/state:nv',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:nv'
      },
      candidates: [
        {
          name: 'Barbara K. Cegavske',
          party: 'Republican',
          candidateUrl: 'http://www.cegavskeforsos.com/',
          phone: '702-873-0711',
          email: 'barbara@cegavskeforsos.com',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/votebarbara'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/votebarbara'
            },
            {
              type: 'GooglePlus',
              id: 'https://plus.google.com/107369704287765365526'
            }
          ]
        },
        {
          name: 'Kate Marshall',
          party: 'Democratic',
          candidateUrl: 'http://katefornevada.com/',
          email: 'kate@katefornevada.com',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/KateMarshallNV'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/katemarshallnv'
            },
            {
              type: 'YouTube',
              id: 'https://www.youtube.com/channel/UCbKtWQdAlCX98bOvPMPmbPw'
            }
          ]
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'Justice Of The Supreme Court, Seat D',
      level: ['administrativeArea1'],
      roles: ['highestCourtJudge'],
      district: {
        name: 'Nevada',
        scope: 'statewide',
        id: 'ocd-division/country:us/state:nv',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:nv'
      },
      candidates: [
        {
          name: 'Mark Gibbons',
          party: 'Nonpartisan'
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'Justice Of The Supreme Court, Seat B',
      level: ['administrativeArea1'],
      roles: ['highestCourtJudge'],
      district: {
        name: 'Nevada',
        scope: 'statewide',
        id: 'ocd-division/country:us/state:nv',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:nv'
      },
      candidates: [
        {
          name: 'Kristina Pickering',
          party: 'Nonpartisan'
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'State Senate, District 14',
      level: ['administrativeArea1'],
      roles: ['legislatorUpperBody'],
      district: {
        name: 'Nevada State Senate district 14',
        scope: 'stateUpper',
        id: 'ocd-division/country:us/state:nv/sldu:14',
        kgForeignKey:
          '/authority/civics/ocd-division/country:us/state:nv/sldu:14'
      },
      candidates: [
        {
          name: 'Don Gustavson',
          party: 'Republican',
          candidateUrl: 'http://www.dongustavson.com/',
          email: 'don.gustavson@sbcglobal.net',
          channels: [
            {
              type: 'Twitter',
              id: 'https://twitter.com/DonGustavson'
            }
          ]
        },
        {
          name: 'Joe Hunt',
          party: 'Democratic',
          candidateUrl: 'http://joehunt.org/',
          email: 'joexhunt@hotmail.com',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/JoeHuntforSenate'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/joexhunt'
            }
          ]
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'State Assembly, District 31',
      level: ['administrativeArea1'],
      roles: ['legislatorLowerBody'],
      district: {
        name: 'Nevada Assembly district 31',
        scope: 'stateLower',
        id: 'ocd-division/country:us/state:nv/sldl:31',
        kgForeignKey:
          '/authority/civics/ocd-division/country:us/state:nv/sldl:31'
      },
      candidates: [
        {
          name: 'Richard "Skip" Daly',
          party: 'Democratic',
          candidateUrl: 'http://www.skipdaly4assembly.com/',
          email: 'skipd@sbcglobal.net',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/115866278491120'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/assmskipdaly'
            }
          ]
        },
        {
          name: 'Jill Dickman',
          party: 'Republican',
          candidateUrl: 'http://www.votejilldickman.com/',
          email: 'jillstilly@aol.com',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/1416331821948736'
            }
          ]
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'Clerk',
      level: ['administrativeArea2'],
      roles: ['governmentOfficer'],
      district: {
        name: 'Washoe County',
        scope: 'countywide',
        id: 'ocd-division/country:us/state:nv/county:washoe',
        kgForeignKey:
          '/authority/civics/ocd-division/country:us/state:nv/county:washoe'
      },
      candidates: [
        {
          name: 'Bobee Clark',
          party: 'Democratic',
          email: 'bobeekay@yahoo.com'
        },
        {
          name: 'Nancy Parent',
          party: 'Republican',
          candidateUrl: 'http://voteparent.com/',
          email: 'n.parent@charter.net'
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'Assessor',
      level: ['administrativeArea2'],
      roles: ['governmentOfficer'],
      district: {
        name: 'Washoe County',
        scope: 'countywide',
        id: 'ocd-division/country:us/state:nv/county:washoe',
        kgForeignKey:
          '/authority/civics/ocd-division/country:us/state:nv/county:washoe'
      },
      candidates: [
        {
          name: 'Michael E Clark',
          party: 'Republican',
          candidateUrl: 'http://www.clarkforassessor.com/',
          email: 'clarkmike85@yahoo.com'
        },
        {
          name: 'Joshua G Wilson',
          party: 'Republican',
          candidateUrl: 'http://wilsonforassessor.com/',
          email: 'joshua_wilson@sbcglobal.net',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/233066500219894'
            }
          ]
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'Public Administrator',
      level: ['administrativeArea2'],
      roles: ['governmentOfficer'],
      district: {
        name: 'Washoe County',
        scope: 'countywide',
        id: 'ocd-division/country:us/state:nv/county:washoe',
        kgForeignKey:
          '/authority/civics/ocd-division/country:us/state:nv/county:washoe'
      },
      candidates: [
        {
          name: 'Don Cavallo',
          party: 'Republican',
          candidateUrl: 'http://doncavallo.com/',
          email: 'doncavalloforpa@gmail.com',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/DonaldCavallo'
            }
          ]
        },
        {
          name: 'Chase D McKenna',
          party: 'Democratic',
          email: 'chasedmckenna@gmail.com'
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'Sheriff',
      level: ['administrativeArea2'],
      roles: ['governmentOfficer'],
      district: {
        name: 'Washoe County',
        scope: 'countywide',
        id: 'ocd-division/country:us/state:nv/county:washoe',
        kgForeignKey:
          '/authority/civics/ocd-division/country:us/state:nv/county:washoe'
      },
      candidates: [
        {
          name: 'Chuck Allen',
          party: 'Nonpartisan',
          candidateUrl: 'http://www.chuckallenforsheriff.com/',
          email: 'chuck@chuckallenforsheriff.com',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/775465905815221'
            },
            {
              type: 'YouTube',
              id: 'https://www.youtube.com/channel/UCbeYfof3pBq9uFJOzFENwlQ'
            }
          ]
        },
        {
          name: 'Tim Kuzanek',
          party: 'Nonpartisan',
          candidateUrl: 'http://kuzanek.com/',
          email: 'tim@kuzanek.com',
          channels: [
            {
              type: 'Facebook',
              id: 'https://www.facebook.com/1387719128154896'
            },
            {
              type: 'Twitter',
              id: 'https://twitter.com/kuzanek'
            },
            {
              type: 'YouTube',
              id: 'https://www.youtube.com/channel/UCwdOnqEF8kf_KljWxNG9IvQ'
            }
          ]
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'Treasurer',
      level: ['administrativeArea2'],
      roles: ['governmentOfficer'],
      district: {
        name: 'Washoe County',
        scope: 'countywide',
        id: 'ocd-division/country:us/state:nv/county:washoe',
        kgForeignKey:
          '/authority/civics/ocd-division/country:us/state:nv/county:washoe'
      },
      candidates: [
        {
          name: 'Tammi Davis',
          party: 'Republican',
          email: 'tammidavis10@gmail.com'
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'Recorder',
      level: ['administrativeArea2'],
      roles: ['governmentOfficer'],
      district: {
        name: 'Washoe County',
        scope: 'countywide',
        id: 'ocd-division/country:us/state:nv/county:washoe',
        kgForeignKey:
          '/authority/civics/ocd-division/country:us/state:nv/county:washoe'
      },
      candidates: [
        {
          name: 'Lawrence Burtness',
          party: 'Republican',
          candidateUrl: 'http://www.burtness4recorder.com/',
          email: 'hercowboy888@yahoo.com'
        },
        {
          name: 'Don Cochran',
          party: 'Independent American',
          email: 'cochrandonald@hotmail.com'
        },
        {
          name: 'Robert Townsend',
          party: 'Democratic',
          email: 'rctowns@charter.net'
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'General',
      office: 'District Attorney',
      level: ['administrativeArea2'],
      roles: ['judge'],
      district: {
        name: 'Washoe County',
        scope: 'countywide',
        id: 'ocd-division/country:us/state:nv/county:washoe',
        kgForeignKey:
          '/authority/civics/ocd-division/country:us/state:nv/county:washoe'
      },
      candidates: [
        {
          name: 'Chris Hicks',
          party: 'Republican',
          candidateUrl: 'http://www.electchrishicks.com/',
          email: 'cjhicksnv@yahoo.com',
          channels: [
            {
              type: 'Twitter',
              id: 'https://twitter.com/OfNoteNevada'
            }
          ]
        }
      ],
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'Referendum',
      district: {
        name: 'Nevada',
        scope: 'statewide',
        id: 'ocd-division/country:us/state:nv',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:nv'
      },
      referendumTitle: 'STATE QUESTION NO. 1',
      referendumSubtitle:
        'Amendment to the Nevada Constitution Senate Joint Resolution No. 14 of the 76th Session',
      referendumUrl: 'http://nvsos.gov/index.aspx?page=1309',
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'Referendum',
      district: {
        name: 'Nevada',
        scope: 'statewide',
        id: 'ocd-division/country:us/state:nv',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:nv'
      },
      referendumTitle: 'STATE QUESTION NO. 2',
      referendumSubtitle:
        'Amendment to the Nevada Constitution Senate Joint Resolution No. 15 of the 76th Session',
      referendumUrl: 'http://nvsos.gov/index.aspx?page=1309',
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    },
    {
      type: 'Referendum',
      district: {
        name: 'Nevada',
        scope: 'statewide',
        id: 'ocd-division/country:us/state:nv',
        kgForeignKey: '/authority/civics/ocd-division/country:us/state:nv'
      },
      referendumTitle: 'STATE QUESTION NO. 3',
      referendumSubtitle:
        'Amendment to Titles 7, 32, 52, 53, 54, 55, 56, 57 of the Nevada Revised Statutes',
      referendumUrl: 'http://nvsos.gov/index.aspx?page=1309',
      sources: [
        {
          name: 'Ballot Information Project',
          official: false
        }
      ]
    }
  ],
  state: [
    {
      name: 'Nevada',
      electionAdministrationBody: {
        name: 'Nevada Secretary of State',
        electionInfoUrl: 'http://nvsos.gov/index.aspx?page=3',
        votingLocationFinderUrl: 'https://nvsos.gov/votersearch/',
        ballotInfoUrl: 'https://nvsos.gov/votersearch/',
        correspondenceAddress: {
          line1: '101 N Carson St., Suite 3',
          city: 'Carson City',
          state: 'Nevada',
          zip: '89701-3714'
        }
      },
      local_jurisdiction: {
        name: 'Washoe County',
        electionAdministrationBody: {
          electionInfoUrl: 'http://www.co.washoe.nv.us/voters',
          correspondenceAddress: {
            line1: 'PO BOX 11130',
            city: 'Reno',
            state: 'NV',
            zip: '89520-0027'
          },
          physicalAddress: {
            line1: '1001 E 9TH ST RM A135',
            city: 'RENO',
            state: 'NV',
            zip: '89512-2845'
          },
          electionOfficials: [
            {
              officePhoneNumber: '(775) 328-3670',
              emailAddress: 'electionsdepartment@washoecounty.us'
            }
          ]
        },
        sources: [
          {
            name: 'DemocracyWorks',
            official: false
          }
        ]
      },
      sources: [
        {
          name: '',
          official: false
        }
      ]
    }
  ]
}

export function getExampleInfo({ address }) {
  if (address.state === 'CA') {
    return caVoterInfo
  }

  if (address.state === 'NV') {
    return nvVoterInfo
  }

  return nyVoterInfo
}

export default {
  getExampleInfo
}
