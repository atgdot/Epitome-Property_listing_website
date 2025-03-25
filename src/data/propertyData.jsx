// propertyData.jsx
const propertyData = {
  trending: [
    {
      category: "RESIDENTIAL",
      city: "GURGAON",
      status: "HIGH RISE",
      title: "City Towers",
      image: "propertyi.png",
      description:
        "Elegant high-rise apartments with state-of-the-art facilities.",
      price: "₹ 12 Cr",
      rentalYield: "4.8%",
      area: "4800 sqft",
      currentRental: "₹ 3,80,000 PM",
      tenure: "Leasehold",
      tenant: "Young Families",
      sector: "Sector 35"
    },
    // ... (other trending properties)
    {
      category: "RESIDENTIAL",
      city: "GURGAON",
      status: "TRENDING",
      title: "Trending Luxury Project",
      image: "propertyi.png",
      description: "A trending luxury property with top amenities.",
      price: "₹ 19 Cr",
      rentalYield: "5.6%",
      area: "5800 sqft",
      currentRental: "₹ 4,80,000 PM",
      tenure: "Freehold",
      tenant: "High Net Worth Individuals",
      sector: "Sector 42"
    }
  ],
  featured: [
    {
      category: "RESIDENTIAL",
      city: "GURGAON",
      status: "FEATURED",
      title: "Featured Project",
      image: "propertyi.png",
      description: "A featured property known for its excellent design.",
      price: "₹ 18 Cr",
      rentalYield: "5.3%",
      area: "5600 sqft",
      currentRental: "₹ 4,50,000 PM",
      tenure: "Freehold",
      tenant: "Professionals",
      sector: "Sector 40"
    }
  ],
  residential: {
    luxuryProjects: [
      {
        category: "RESIDENTIAL",
        city: "GURGAON",
        status: "PRIME LOCATION | RESALE",
        title: "DLF Magnolias - Luxury",
        image: "propertyi.png",
        description:
          "Exclusive gated community in the heart of Gurgaon with 360° security.",
        price: "₹ 18.5 Cr",
        rentalYield: "5.2%",
        area: "5500 sqft",
        currentRental: "₹ 4,50,000 PM",
        tenure: "Freehold",
        tenant: "Senior Executives",
        sector: "Sector 42"
      },
      {
        category: "RESIDENTIAL",
        city: "GURGAON",
        status: "PRIME LOCATION | RESALE",
        title: "Prestige Residency",
        image: "propertyi.png",
        description:
          "Luxury living with top-notch amenities and panoramic views.",
        price: "₹ 20 Cr",
        rentalYield: "5.5%",
        area: "6000 sqft",
        currentRental: "₹ 5,00,000 PM",
        tenure: "Freehold",
        tenant: "High Net Worth Individuals",
        sector: "Sector 45"
      }
    ],
    upcomingProjects: [
      {
        category: "RESIDENTIAL",
        city: "GURGAON",
        status: "UPCOMING LAUNCH",
        title: "Future Heights",
        image: "propertyi.png",
        description:
          "Modern designs and innovative architecture coming soon.",
        price: "₹ 15 Cr",
        rentalYield: "5.0%",
        area: "5000 sqft",
        currentRental: "₹ 4,00,000 PM",
        tenure: "Freehold",
        tenant: "Young Professionals",
        sector: "Sector 50"
      },
      {
        category: "RESIDENTIAL",
        city: "GURGAON",
        status: "UPCOMING LAUNCH",
        title: "Skyline Residency",
        image: "propertyi.png",
        description:
          "A new era of urban living with spacious apartments.",
        price: "₹ 16 Cr",
        rentalYield: "5.1%",
        area: "5200 sqft",
        currentRental: "₹ 4,20,000 PM",
        tenure: "Freehold",
        tenant: "Families",
        sector: "Sector 52"
      }
    ],
    highRiseApartments: [
      {
        category: "RESIDENTIAL",
        city: "GURGAON",
        status: "HIGH RISE",
        title: "City Towers",
        image: "propertyi.png",
        description:
          "Elegant high-rise apartments with state-of-the-art facilities.",
        price: "₹ 12 Cr",
        rentalYield: "4.8%",
        area: "4800 sqft",
        currentRental: "₹ 3,80,000 PM",
        tenure: "Leasehold",
        tenant: "Young Families",
        sector: "Sector 35"
      },
      {
        category: "RESIDENTIAL",
        city: "GURGAON",
        status: "HIGH RISE",
        title: "Urban Peak",
        image: "propertyi.png",
        description:
          "Premium apartments with modern amenities and great connectivity.",
        price: "₹ 13 Cr",
        rentalYield: "4.9%",
        area: "5000 sqft",
        currentRental: "₹ 4,00,000 PM",
        tenure: "Leasehold",
        tenant: "Professionals",
        sector: "Sector 36"
      }
    ]
  },
  commercial: {
    offices: [
      {
        category: "COMMERCIAL",
        city: "GURGAON",
        status: "OFFICE SPACE",
        title: "Downtown Offices",
        image: "propertyi.png",
        description:
          "Modern office space in the heart of the city.",
        price: "₹ 16 Cr",
        rentalYield: "5.1%",
        area: "5200 sqft",
        currentRental: "₹ 4,20,000 PM",
        tenure: "Leasehold",
        tenant: "Businesses",
        sector: "Sector 52"
      },
      {
        category: "COMMERCIAL",
        city: "GURGAON",
        status: "OFFICE SPACE",
        title: "Corporate Hub",
        image: "propertyi.png",
        description:
          "Premium office spaces for corporate needs.",
        price: "₹ 18 Cr",
        rentalYield: "5.3%",
        area: "5500 sqft",
        currentRental: "₹ 4,50,000 PM",
        tenure: "Leasehold",
        tenant: "Corporate",
        sector: "Sector 55"
      }
    ],
    preLeasedOffices: [
      {
        category: "COMMERCIAL",
        city: "GURGAON",
        status: "PRE-LEASED",
        title: "Business Center",
        image: "propertyi.png",
        description:
          "Pre-leased office spaces with ready-to-move facilities.",
        price: "₹ 20 Cr",
        rentalYield: "5.4%",
        area: "6000 sqft",
        currentRental: "₹ 5,00,000 PM",
        tenure: "Leasehold",
        tenant: "Corporate",
        sector: "Sector 60"
      }
    ],
    preRented: [
      {
        category: "COMMERCIAL",
        city: "GURGAON",
        status: "PRE-RENTED",
        title: "Pre-Rented Offices",
        image: "propertyi.png",
        description:
          "Fully occupied offices with stable rental income.",
        price: "₹ 17 Cr",
        rentalYield: "5.2%",
        area: "5300 sqft",
        currentRental: "₹ 4,30,000 PM",
        tenure: "Leasehold",
        tenant: "Businesses",
        sector: "Sector 58"
      }
    ],
    sco: [
      {
        category: "COMMERCIAL",
        city: "GURGAON",
        status: "SCO",
        title: "SCO Mall",
        image: "propertyi.png",
        description:
          "A mixed-use commercial property with retail and office spaces.",
        price: "₹ 22 Cr",
        rentalYield: "5.6%",
        area: "7000 sqft",
        currentRental: "₹ 6,00,000 PM",
        tenure: "Leasehold",
        tenant: "Retailers",
        sector: "Sector 65"
      }
    ]
  }
};

export default propertyData;
