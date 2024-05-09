import { type Place } from "./schema";

const places: Place[] = [
  {
    location: [114.300844, 22.600616],

    name: "Vanke East Coast Exercising Park",
    originalName: "东海岸运动公园",
    rangeId: "meisha",
    categoryId: "park",

    description:
      "Vanke East Coast Exercising Park is a park where you can walk, run, and relax. There are lots of lotus and trees; the park is usually quiet and the air feels fresh.",

    authors: "Oliver",
  },
  {
    location: [114.312739, 22.59973],

    name: "Uphill Community Park",
    originalName: "鹅公岌社区公园",
    rangeId: "meisha",
    categoryId: "park",

    description:
      "There is a beautiful uphill trail surrounded by trees in this park where you can walk to the top of a hill. On the top, there is a nice lookout spot where you can look down at all the Dameisha.",

    authors: "Oliver",
  },
  {
    location: [114.324042, 22.595271],

    name: "Xiaomeisha Seashore Walkway",
    originalName: "小梅沙海滨栈道",
    rangeId: "meisha",
    categoryId: "walkway",

    description:
      "This is a well-established walkway across Dameisha and Xiaomeisha with beautiful views of the sea. This walkway usually don’t have many people, so you can enjoy many beautiful sight seeing spots along the walk way with little disturbance!",

    authors: "Oliver",
  },
  {
    location: [114.305176, 22.606662],

    name: "Fjord Walkway",
    originalName: "峡湾栈道",
    rangeId: "meisha",
    categoryId: "walkway",

    description:
      "This is another long walkway in Dameisha where you can hike while enjoying beautiful sea views.",

    authors: "Oliver",
  },
  {
    location: [114.307954, 22.592429],

    name: "Dameisha Seashore Park",
    originalName: "大梅沙海滨公园",
    rangeId: "meisha",
    categoryId: "park",

    description: `Oliver: This is a park at the Dameisha beach enjoy the sea view and relax on the beach. Here, you can access a long walkway connected to the Xiaomeisha Seashore Walkway and other parts of the Dantean District.
Doris: Dameisha Seaside Park is a seaside park in Yantian District of Shenzhen City, located in the embrace of mountains on three sides, the middle of the open and gentle, one side facing the sea. The park is divided into swimming area, sports area, leisure area, entertainment area, barbecue area and other areas. Here is the longest beach in Shenzhen, the water is clear, the beach is vast, the sand is soft, and there are water ski ropeway, motorboat, ATV, water parachute, beach volleyball, beach football and other recreational projects. The park also has shopping center, shower storage, catering supply, leisure tea, swimming equipment rental, security, life saving and other supporting services.`,

    streetViewUrl:
      "https://map.baidu.com/#panoid=2500810012230414113333206OI&panotype=street&heading=142.93&pitch=0&l=21&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%227aea43b7c03074f87c29bd28%22%7D%7D",

    authors: ["Oliver", "Doris"],
  },

  // {
  //   location: [114.307954, 22.592429],

  //   name: "Dameisha Park",
  //   originalName: "大梅沙",
  //   rangeId: "meisha",
  //   categoryId: "park",

  //   description:
  //     "Dameisha park is the biggest tourist attraction in the area. You can enjoy the beach and participate in numerous kinds of activities in the park, including water sports.",

  //   author: "Oliver",
  // },
  {
    location: [114.311617, 22.595082],

    name: "Dameisha Beach Waterpark",
    originalName: "大梅沙海滨公园海滩水乐园",
    rangeId: "meisha",
    categoryId: "amusement-park",

    description:
      "This is a park built on the Dameisha beach for children to play on water. There are small waterslides.",

    authors: "Oliver",
  },
  {
    location: [114.309256, 22.597907],

    name: "Mid-lake Park",
    originalName: "内湖公园",
    rangeId: "meisha",
    categoryId: "park",

    description:
      "This is the park beside the VMA campus, going across the Dameisha Outlets. You can enjoy the beautiful scenery of the late and relax under the sunlight. You can see black swans if you are lucky!",

    streetViewUrl:
      "https://map.baidu.com/#panoid=0900570012211231143603208HP&panotype=street&heading=252.31&pitch=0&l=21&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%220cbd0541ba1a4fa2b9df8fde%22%7D%7D",

    authors: "Oliver",
  },

  {
    location: [114.30482, 22.601422],

    name: "Meisha Hospital",
    originalName: "梅沙医院",
    rangeId: "meisha",
    categoryId: "hospital",

    description:
      "This is the closest public hospital to the Dameisha community. It has complete services and equipments for a variety of treatments.",
    coverImage: "/images/meisha-hospital/cover.png",

    streetViewUrl:
      "https://map.baidu.com/#panoid=09005700011606271030045252F&panotype=street&heading=277.22&pitch=15.74&l=21&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%22b0d056f2a82ec467cac3db00%22%7D%7D",

    authors: "Oliver",
  },
  {
    location: [114.305151, 22.595686],

    name: "Naber Pharmacy",
    originalName: "南北药行",
    rangeId: "meisha",
    categoryId: "pharmacy",

    streetViewUrl:
      "https://map.baidu.com/#panoid=09005700122003270956336405O&panotype=street&heading=153.33&pitch=6&l=21&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%22844a750e84d0e7b96268582f%22%7D%7D",

    authors: "Oliver",
  },
  {
    location: [114.305486, 22.600009],

    name: "China Associate Pharmacy",
    originalName: "中联大药房",
    rangeId: "meisha",
    categoryId: "pharmacy",

    streetViewUrl:
      "https://map.baidu.com/#panoid=0900570012211229132823535HP&panotype=street&heading=322.05&pitch=7.21&l=21&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%22b1c556e8cc0c980cb426552e%22%7D%7D",

    authors: "Oliver",
  },
  {
    location: [114.31046, 22.599214],

    name: "Wanchun Pharmacy",
    originalName: "万春堂",
    rangeId: "meisha",
    categoryId: "pharmacy",

    streetViewUrl:
      "https://map.baidu.com/#panoid=0900570012211231101217636HP&panotype=street&heading=153.91&pitch=0.9&l=21&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%22b0318b5a2e900a989d82ea75%22%7D%7D",

    authors: "Oliver",
  },

  {
    location: [114.305833, 22.595824],

    name: "Coconut Chicken",
    originalName: "良禽择木",
    rangeId: "meisha",
    categoryId: "restaurant",

    description:
      "This is a place where you can eat hotpot with coconut and chicken.",
    coverImage: "/images/coconut-chicken/cover.jpeg",

    signatureDishes: [
      {
        name: "Coconut Chicken",
        originalName: "椰子鸡",
        price: 158,
        image: "/images/coconut-chicken/1.jpeg",
      },
      {
        name: "Yangzhou Fried Rice",
        originalName: "扬州炒饭",
        price: 28,
        image: "/images/coconut-chicken/2.jpeg",
      },
      {
        name: "Stir-fried Clam",
        originalName: "炒花甲",
        price: 38,
        image: "/images/coconut-chicken/3.jpeg",
      },
    ],

    authors: "Rachel",
  },
  {
    location: [114.30553, 22.593075],

    name: "Lanzhou Noodles",
    originalName: "兰州拉面",
    rangeId: "meisha",
    categoryId: "restaurant",

    description: "This is a place where you can eat halal food.",
    coverImage: "/images/lanzhou-noodles/cover.jpeg",

    signatureDishes: [
      {
        name: "Ramen with Beef",
        originalName: "牛肉拉面",
        price: 15,
        image: "/images/lanzhou-noodles/1.jpeg",
      },
      {
        name: "Beef Dumplings",
        originalName: "牛肉水饺",
        price: 22,
        image: "/images/lanzhou-noodles/2.jpeg",
      },
      {
        name: "Fried Lamb and Rice with Scallions",
        originalName: "葱爆羊肉饭",
        price: 30,
        image: "/images/lanzhou-noodles/3.jpeg",
      },
    ],

    streetViewUrl:
      "https://map.baidu.com/#panoid=0900570012211231135522642HP&panotype=street&heading=161.97&pitch=0&l=21&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%228a218bd9bf25dc784c3a59a1%22%7D%7D",

    authors: "Rachel",
  },
  {
    location: [114.308212, 22.594924],

    name: "Mcdonald’s",
    originalName: "麦当劳",
    rangeId: "meisha",
    categoryId: "fast-food",

    coverImage: "/images/mcdonalds/cover.jpeg",

    authors: "Rachel",
  },
  {
    location: [114.308934, 22.596855],

    name: "Pizza Hut",
    originalName: "必胜客",
    rangeId: "meisha",
    categoryId: "fast-food",

    coverImage: "/images/pizza-hut/cover.jpeg",

    authors: "Rachel",
  },
  {
    location: [114.308057, 22.597201],

    name: "Burger King",
    originalName: "汉堡王",
    rangeId: "meisha",
    categoryId: "fast-food",

    coverImage: "/images/burger-king/cover.jpeg",

    streetViewUrl:
      "https://map.baidu.com/#panoid=09005700122003271102513045O&panotype=street&heading=201.35&pitch=8.16&l=21&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%22a0b849f3731bdbd8c72ba12c%22%7D%7D",

    authors: "Rachel",
  },
  {
    location: [114.305722, 22.593723],

    name: "Wugufang Roast Pigeon",
    originalName: "五谷芳烤乳鸽",
    rangeId: "meisha",
    categoryId: "restaurant",

    description:
      "This is a place where you can eat Guangdong traditional foods.",
    coverImage: "/images/wugufang-roast-pigeon/cover.jpeg",

    signatureDishes: [
      {
        name: "Roast Pigeon",
        originalName: "烤乳鸽",
        price: 48,
        image: "/images/wugufang-roast-pigeon/1.jpeg",
      },
      {
        name: "Yong Tau Foo",
        originalName: "客家酿豆腐",
        price: 38,
        image: "/images/wugufang-roast-pigeon/2.jpeg",
      },
      {
        name: "Fried Rice with Sea Urchin",
        originalName: "海胆炒饭",
        price: 98,
        image: "/images/wugufang-roast-pigeon/3.jpeg",
      },
    ],

    streetViewUrl:
      "https://map.baidu.com/#panoid=0900570012190807125847482Q8&panotype=street&heading=309.64&pitch=1.45&l=21&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%2285d4699cc4c66bc5f03cbac5%22%7D%7D",

    authors: "Rachel",
  },
  {
    location: [114.308338, 22.598859],

    name: "Seaside Sushi",
    originalName: "海边的寿司店",
    rangeId: "meisha",
    categoryId: "restaurant",

    coverImage: "/images/seaside-sushi/cover.jpeg",

    signatureDishes: [
      {
        name: "Fried Shrimp Rolls with Mango",
        originalName: "芒果炸虾卷",
        price: 42,
        image: "/images/seaside-sushi/1.jpeg",
      },
      {
        name: "California Roll",
        originalName: "加州卷",
        price: 36,
        image: "/images/seaside-sushi/2.jpeg",
      },
      {
        name: "Japanese Pan-fried Dumpling",
        originalName: "日式煎饺",
        price: 12,
        image: "/images/seaside-sushi/3.jpeg",
      },
    ],

    authors: "Rachel",
  },
  {
    location: [114.308527, 22.596445],

    name: "Nayuki",
    originalName: "奈雪的茶",
    rangeId: "meisha",
    categoryId: "beverage",

    description:
      "This is a place where you can drink milk teas and eat breads.",
    coverImage: "/images/nayuki/cover.jpeg",

    signatureDishes: [
      {
        name: "Brown Sugar Boba Tea",
        originalName: "黑糖珠珠宝藏茶",
        price: 21,
        image: "/images/nayuki/1.jpeg",
      },
      {
        name: "Strawberry Creamed Bread",
        originalName: "草莓魔法棒",
        price: 20,
        image: "/images/nayuki/2.jpeg",
      },
      {
        name: "Grape Fruit Tea with Cheese",
        originalName: "霸气芝士葡萄",
        price: 28,
        image: "/images/nayuki/3.jpeg",
      },
    ],

    streetViewUrl:
      "https://map.baidu.com/#panoid=2300570012221204205405903OI&panotype=street&heading=335.04&pitch=0&l=21&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%221bd1f8675627201c081cc795%22%7D%7D",

    authors: "Rachel",
  },
  {
    location: [114.306352, 22.595529],

    name: "Yarra Café",
    originalName: "雅拉画廊咖啡",
    rangeId: "meisha",
    categoryId: "beverage",

    description:
      "The top ranked coffee shop in Dameisha.They offer bilingual menu!",

    signatureDishes: [
      {
        name: "Latte",
        originalName: "拿铁",
        price: 32,
        image: "/images/yarra-cafe/1.jpeg",
      },
      {
        name: "Pour-over coffee",
        originalName: "精品手冲",
        price: 68,
        image: "/images/yarra-cafe/2.jpeg",
      },
      {
        name: "Flat white coffee",
        originalName: "澳白",
        price: 32,
        image: "/images/yarra-cafe/3.jpeg",
      },
    ],

    authors: "Oliver",
  },
  {
    location: [114.308753, 22.598978],

    name: "Starbucks",
    originalName: "星巴克",
    rangeId: "meisha",
    categoryId: "beverage",

    description: "There is also a Starbucks in Dameisha!",

    streetViewUrl:
      "https://map.baidu.com/#panoid=2300570012221204205405905OI&panotype=street&heading=148.22&pitch=0&l=21&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%2297db902b83330d9082288afa%22%7D%7D",

    authors: "Oliver",
  },
  {
    location: [114.308698, 22.594092],

    name: "Time",
    originalName: "研磨时光",
    rangeId: "meisha",
    categoryId: "beverage",

    description: "A shop that makes fresh fruit juice and coffee.",
    coverImage: "/images/time/cover.jpeg",

    signatureDishes: [
      {
        name: "Orange juice",
        originalName: "现榨香橙汁",
        price: 29,
        image: "/images/time/cover.jpeg",
      },
      {
        name: "Snow pear juice",
        originalName: "现榨雪梨汁",
        price: 29,
        image: "/images/time/cover.jpeg",
      },
      {
        name: "Toffee & hazel latte",
        originalName: "太妃榛子拿铁",
        price: 35,
        image: "/images/time/cover.jpeg",
      },
    ],

    authors: "Oliver",
  },

  {
    location: [114.289192, 22.59186],

    name: "Dameisha Skydiving Base",
    originalName: "深圳大梅沙跳伞基地",
    rangeId: "meisha",
    categoryId: "fitness",

    coverImage: "/images/dameisha-skydiving-base/cover.jpeg",

    authors: "Oliver",
  },
  {
    location: [114.309633, 22.594766],

    name: "Dameisha Yacht Service Center",
    originalName: "大梅沙游艇旅游服务中心",
    rangeId: "meisha",
    categoryId: "fitness",

    coverImage: "/images/dameisha-yacht-service-center/cover.jpeg",

    authors: "Oliver",
  },
  {
    location: [114.312238, 22.598236],

    name: "Dameisha Yacht & Sailing Rental Center",
    originalName: "大梅沙游艇帆船出租中心",
    rangeId: "meisha",
    categoryId: "fitness",

    coverImage: "/images/dameisha-yacht-sailing-rental-center/cover.jpeg",

    authors: "Oliver",
  },
  {
    location: [114.311454, 22.597956],

    name: "Yijing Surfing",
    originalName: "逸景电动冲浪俱乐部",
    rangeId: "meisha",
    categoryId: "fitness",

    description:
      "A club where you can experience electric surfing, motorboat, and snorkeling!",
    coverImage: "/images/yijing-surfing/cover.jpeg",

    authors: "Oliver",
  },
  {
    location: [114.239208, 22.553136],

    name: "One City",
    originalName: "壹海城",
    rangeId: "shatoujiao",
    categoryId: "shopping-mall",

    description: "A Yantian shopping mall.",

    streetViewUrl:
      "https://map.baidu.com/#panoid=09005700121709191556031678Y&panotype=street&heading=82.88&pitch=9.01&l=21&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%224c1d4e42c257378038221ce2%22%7D%7D",

    authors: "Rachel",
  },
  {
    location: [114.109696, 22.540133],

    name: "The MiXC",
    originalName: "罗湖万象城",
    rangeId: "shenzhen",
    categoryId: "shopping-mall",

    description: "A Luohu shopping mall.",

    authors: "Rachel",
  },
  {
    location: [114.054007, 22.533569],

    name: "COCO Park",
    originalName: "COCO Park",
    rangeId: "shenzhen",
    categoryId: "shopping-mall",

    description:
      "COCO Park is the most fashionable shopping center in Shenzhen, integrating dining, shopping, leisure and entertainment. It has more than 200 international and domestic well-known brands. The first floor is the Yoshinoshima supermarket, international chain catering, jewelry accessories, personal care, home life, video and music, gift shop. On the first floor, there are international boutique clothing stores, jewelry, watches, classic accessories stores, China Mobile Information Life Hall, COCO open-air International Bar Street. On the second floor are business casual clothing, fashion women's clothing, leisure sports city, international specialty dining, popular accessories, home life, audio-visual gift shop and Broadway Cinema. The third floor is a high-end food concept restaurant and beauty care SPA. Weifang Taihua City COCO PARK is located in the south side of Taihua City Holiday Plaza podium building, through the beautiful music fountain and landscape water curtain, next to an entertainment and food center that runs through and echoes the whole Taihua City. There is a large landscape hollow in front of the door, which looks like a spectacular dynamic glass box. It will become a new fashion party base for entertainment and leisure in Weifang. There is the first large-sized IMAX large-screen theater spanning three floors in Shandong Province, a super-sized disco, a bar nightclub, a pool room and a number of medium-sized luxury theme Chinese and Western restaurants.",

    streetViewUrl:
      "https://map.baidu.com/#panoid=2500780012230623184316343OI&panotype=street&heading=175.42&pitch=0&l=13&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%2294237e25c9161a749d82eaa9%22%7D%7D",

    authors: ["Rachel", "Doris"],
  },
  {
    location: [113.935172, 22.517058],

    name: "Coastal City",
    originalName: "海岸城",
    rangeId: "shenzhen",
    categoryId: "shopping-mall",

    description:
      "Shenzhen Coastal City is located in the commercial and cultural center of Nanshan District, close to five main urban roads in Nanshan District, such as Binhai Avenue, Nanhai Avenue, Houhai Avenue, Houhaibin Road and Chuangye Road. Coast City consists of East office building, Coast City West office building, Coast City shopping center and coast style street, which is the largest comprehensive business and commercial project in the west of Shenzhen, and is also the largest indoor shopping, leisure and entertainment center in Shenzhen so far. The total investment of Coastal City is about 2 billion yuan, and the total construction area is about 300,000 square meters. Among them: shopping center about 120,000 square meters; About 140,000 square meters of office space; The commercial street is about 40,000 square meters. Coast City has about 2,000 underground parking Spaces. According to the China Shopping Center rating evaluation standard in 2019, it was rated as a national five-star shopping center.",

    streetViewUrl:
      "https://map.baidu.com/#panoid=09005700122202261204570986P&panotype=street&heading=75.18&pitch=8.45&l=13&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%22fa46d9f9597239d629fc4888%22%7D%7D",

    authors: ["Rachel", "Doris"],
  },
  {
    location: [114.314845, 22.597653],

    name: "Intercontinental Shenzhen Dameisha Resort",
    originalName: "大梅沙洲际酒店",
    rangeId: "meisha",
    categoryId: "hotel",

    coverImage: "/images/intercontinental-shenzhen-dameisha-resort/cover.jpeg",

    streetViewUrl:
      "https://map.baidu.com/#panoid=2500670012230701191448185OI&panotype=street&heading=307.85&pitch=-18.53&l=13&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%2279cb56ac3534a534912ca345%22%7D%7D",

    authors: "Hao Du",
  },
  {
    location: [114.27579, 22.631594],

    name: "The Interlaken OCT Hotel",
    originalName: "东部华侨城茵特拉根酒店",
    rangeId: "yantian",
    categoryId: "hotel",

    coverImage: "/images/interlaken-oct-hotel/cover.jpeg",

    authors: "Hao Du",
  },
  {
    location: [114.310454, 22.598002],

    name: "Shenzhen Dameisha Kingkey Palace Hotel",
    originalName: "深圳大梅沙京基海湾酒店",
    rangeId: "meisha",
    categoryId: "hotel",

    coverImage: "/images/kingkey-palace-hotel/cover.jpeg",

    streetViewUrl:
      "https://map.baidu.com/#panoid=09005700122103021349094412S&panotype=street&heading=190.06&pitch=34.04&l=13&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%22e6ee2fd2b7bd5d352a11d18a%22%7D%7D",

    authors: "Hao Du",
  },
  {
    location: [114.30655, 22.593824],

    name: "Hilton Hampton",
    originalName: "希尔顿欢朋酒店",
    rangeId: "meisha",
    categoryId: "hotel",

    coverImage: "/images/hilton-hampton/cover.png",

    authors: "Hao Du",
  },
  {
    location: [114.30598, 22.59289],

    name: "Vienna International Hotel",
    originalName: "维也纳国际酒店",
    rangeId: "meisha",
    categoryId: "hotel",

    coverImage: "/images/vienna-international-hotel/cover.png",

    streetViewUrl:
      "https://map.baidu.com/#panoid=0900570012190807123744589Q8&panotype=street&heading=305.39&pitch=26.67&l=13&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%2210d1b357ec5ff2d521022009%22%7D%7D",

    authors: "Hao Du",
  },
  // {
  //   location: [114.305634, 22.591975],

  //   name: "Green Tree Alliance Hotel",
  //   originalName: "格林联盟酒店",
  //   rangeId: "meisha",
  //   categoryId: "hotel",

  //   author: "Hao Du",
  // },
  {
    location: [114.310054, 22.599981],

    name: "Pattaya Hotel",
    originalName: "芭提雅酒店",
    rangeId: "meisha",
    categoryId: "hotel",

    coverImage: "/images/pattaya-hotel/cover.png",

    streetViewUrl:
      "https://map.baidu.com/#panoid=09005700122003271103002485O&panotype=street&heading=10.24&pitch=7.94&l=13&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%22f5e3bcaef981cdd85e17c343%22%7D%7D",

    authors: "Hao Du",
  },
  {
    location: [114.30598, 22.59289],

    name: "Vienna Hotel",
    originalName: "维也纳酒店",
    rangeId: "meisha",
    categoryId: "hotel",

    coverImage: "/images/vienna-hotel/cover.png",

    streetViewUrl:
      "https://map.baidu.com/#panoid=0900570012221202131743458GG&panotype=street&heading=51.33&pitch=4.9&l=13",

    authors: "Hao Du",
  },
  {
    location: [114.303333, 22.603265],

    name: "Leyoujia.com",
    originalName: "乐有家",
    rangeId: "meisha",
    categoryId: "apartment-rental",

    coverImage: "/images/leyoujia/cover.png",

    authors: "Hao Du",
  },
  {
    location: [114.305604, 22.601214],

    name: "Zhongyuan Real Estate",
    originalName: "中原地产",
    rangeId: "meisha",
    categoryId: "apartment-rental",

    coverImage: "/images/zhongyuan-real-estate/cover.png",

    authors: "Hao Du",
  },
  {
    location: [114.313683, 22.599189],

    name: "PinAn Bank",
    originalName: "平安银行",
    rangeId: "meisha",
    categoryId: "bank",

    coverImage: "/images/pinan-bank/cover.png",

    streetViewUrl:
      "https://map.baidu.com/#panoid=09005700011606261504561792F&panotype=street&heading=338.63&pitch=5.94&l=13&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%226113ef77b4b968148e77272e%22%7D%7D",

    authors: "Hao Du",
  },
  {
    location: [114.307825, 22.594095],

    name: "CCB ATM",
    originalName: "建行自助取款机",
    rangeId: "meisha",
    categoryId: "atm",

    coverImage: "/images/ccb-atm/cover.png",

    authors: "Hao Du",
  },
  {
    location: [114.311149, 22.599617],

    name: "Meisha Police Station",
    originalName: "梅沙派出所",
    rangeId: "meisha",
    categoryId: "police",

    coverImage: "/images/meisha-police-station/cover.png",

    authors: "Hao Du",
  },
  {
    location: [114.305297, 22.59448],

    name: "XLCT Pharmacy Shop",
    originalName: "杏林大药房",
    rangeId: "meisha",
    categoryId: "pharmacy",

    coverImage: "/images/xlct-pharmacy-shop/cover.png",

    streetViewUrl:
      "https://map.baidu.com/#panoid=01005700001311291006214595D&panotype=street&heading=301.8&pitch=6.59&l=13&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%2206d0dc97f93039a038e4a63b%22%7D%7D",

    authors: "Hao Du",
  },

  {
    location: [114.273534, 22.597335],

    name: "Cloud Sea Park",
    originalName: "云海公园",
    rangeId: "yantian",
    categoryId: "park",

    description:
      "It is a park that is high on a mountain. A yacht-like library stands on the apex of the park. You can overlook the whole Yantian district from the library. When walking in the park, countless trees will shade you from the sun in the summer.",
    coverImage: "/images/cloud-sea-park/cover.jpeg",

    authors: "Kelvin",
  },
  {
    location: [114.273631, 22.582122],

    name: "Yandun Mountain International Friendship Park",
    originalName: "烟墩山国际友好公园",
    rangeId: "yantian",
    categoryId: "park",

    description:
      "It is a park located on a hill. Despite the fact that the hill is small and low, its scenery is worth seeing.",
    coverImage:
      "/images/yandun-mountain-international-friendship-park/cover.jpeg",

    streetViewUrl:
      "https://map.baidu.com/#panoid=2300570012221204210007940OI&panotype=street&heading=248.2&pitch=6.59&l=13",

    authors: "Kelvin",
  },
  {
    location: [114.274001, 22.629539],

    name: "Sun Yat-sen 1900 revolution Sculpture Garden",
    originalName: "孙中山庚子守义雕塑园",
    rangeId: "yantian",
    categoryId: "park",

    description:
      "The park commemorates the first democratic revolution in China. In 1900, Sun Yat-sen led a revolution in Sanzhoutian and fired the first shot to overthrow the feudal autocratic rule of the Manchu Dynasty, but the revolution failed because of a lack of ammunition.",
    coverImage:
      "/images/sun-yat-sen-1900-revolution-sculpture-garden/cover.jpeg",

    authors: "Kelvin",
  },
  {
    location: [114.239064, 22.568344],

    name: "Enshang Ecological Park",
    originalName: "恩上生态公园",
    rangeId: "shatoujiao",
    categoryId: "park",

    description:
      "The park is located on a hill next to the highest mountain in Shenzhen, Wutong Mt., and there is a route to it. There is a big grassland in the park and an old banian in the middle of the park. Many people sit on the grass and have a relaxing picnic.",
    coverImage: "/images/enshang-ecological-park/cover.jpeg",

    authors: "Kelvin",
  },
  {
    location: [114.24014, 22.559641],

    name: "Haishan Park",
    originalName: "海山公园",
    rangeId: "shatoujiao",
    categoryId: "park",

    description:
      "The park is on a small hill beside the center of Yantian. There is a Spanish-style building at the top of the hill. Many people jog in the park.",
    coverImage: "/images/haishan-park/cover.jpeg",

    authors: "Kelvin",
  },
  {
    location: [114.251144, 22.56907],

    name: "Hillside Greenway",
    originalName: "半山绿道",
    rangeId: "shatoujiao",
    categoryId: "walkway",

    description:
      "The greenway is relatively long. It starts at Yantian Senior High School and ends at Enshang Ecological Park. The total distance is 9 km. The first half path is all stone stairs, which challenge your thigh. The second half is all flat roads, which is relaxing.",
    coverImage: "/images/hillside-greenway/cover.jpeg",

    authors: "Kelvin",
  },
  {
    location: [114.242004, 22.552449],

    name: "Yantian Port Viewing Platform",
    originalName: "盐田港观景平台",
    rangeId: "shatoujiao",
    categoryId: "other",

    description:
      "It's right out of Yantian Senior High School, under a big curve. You can see the whole of Yantian Port on the platform. Many people go there in the evening to take photos of the night view of Yantian Port.",
    coverImage: "/images/yantian-port-viewing-platform/cover.jpeg",

    authors: "Kelvin",
  },
  {
    location: [114.230945, 22.54357],

    name: "Chung Ying Street",
    originalName: "中英街",
    rangeId: "shatoujiao",
    categoryId: "other",

    description: `It's a commercial street and is located at the border of Shenzhen and Hong Kong. The meaning of its name is "the street owned by both China and the UK." In the past, Shenzhen was not as developed as today, and at the same time, many people didn't have a license to go to Hong Kong, so people who worked in Shenzhen but lived in other provinces went to Chung Ying Street to buy gifts for children or the elderly in their hometown. Nowadays, the street is not as crowded as before, since many products can be bought in Shenzhen and on the Internet. You can still see the boundary tablets and sentries there.
Zhongying Street, located at the junction of Sha Tau Kok Street and the North District of Hong Kong Special Administrative Region, Yantian District, Shenzhen City, Guangdong Province, backed by Wutong Hill, south of Mirs Bay, from Wutong Hill to Mirs Bay river bed silted into, formerly known as "Morant Path", about 250 meters long, about 3-4 meters wide, Shenzhen Hong Kong half, the street center to "boundary stone" as the boundary, along with Hong Kong Street, It is necessary to apply for a permit to enter "Chung Ying Street", so "Chung Ying Street" is called "Special Zone" in the Special Zone. Zhongying Street has 5 streets and roads, including Walking Street, Ring Road, Waterfront Street, Hengtou Street and Bihai Road. The main buildings include entrance square, entrance building, arcade, street corner building, corner Square, Banyan Tree Avenue, Regression Square, Tianhou Palace Square, Binhai View Road, Zhongying Street Sign Tower Park, Waterfront Green Water Promenade and Zhongying Street Sculpture Wall. There are many shops along the street. It reflects the historical landscape and cultural customs of "One street, two systems". With its unique characteristics, Zhongying Street is a famous street of Chinese history and culture and a hometown of Chinese folk art, with the common roots of the symbiotic culture between Shenzhen and Hong Kong, the century-old struggle culture and the long-standing Hakka traditional culture.`,
    coverImage: "/images/chung-ying-street/cover.jpeg",

    authors: ["Kelvin", "Doris"],
  },
  {
    location: [114.239838, 22.552295],

    name: "Yantian Central Park",
    originalName: "盐田区中央公园",
    rangeId: "shatoujiao",
    categoryId: "park",

    description: `Kelvin: It is a park located in the center of Yantian. Many children and the elderly wander in the park in the afternoon, and you can also see women in middle age dancing every night. The choices for food and entertainment are abundant. It's a place that shows the civil culture of Yantian.
Doris: Shenzhen Yantian Central Park has an open area of 56,282 square meters and a children's play area of 3,500 square meters. It is divided into a play area, a roller skating area and a big octopus landscape area. The designer of the big octopus landscape is Dutch artist Florentijn Hofmann, who is also the designer of the big yellow duck that is popular around the world. The landscape design of Yantian Central Park is a collection of water features, overpasses, sunken squares, wave platforms, etc., to meet the needs of citizens of different ages. The green landscape of the park contains more than 40 kinds of plants, including the King coconut Palm Avenue, leisure lawn, water lily landscape pool and a variety of flowers and shrubs, and trees can present four seasons of flowering plant landscape for visitors to enjoy`,
    coverImage: "/images/yantian-central-park/cover.jpeg",

    authors: ["Kelvin", "Doris"],
  },

  {
    location: [114.238588, 22.555292],

    name: "Peninsula Tin Box",
    originalName: "半岛铁盒",
    rangeId: "shatoujiao",
    categoryId: "restaurant",

    description: "A place where you can have delicable light meals",

    signatureDishes: [
      {
        name: "Low fat grilled chicken leg sandwich",
        price: 22,
        image: "/images/peninsula-tin-box/1.jpeg",
      },
      {
        name: "Herb chicken breast vegetable sandwich",
        price: 24,
        image: "/images/peninsula-tin-box/2.jpeg",
      },
    ],

    authors: "Kelvin",
  },
  {
    location: [114.307936, 22.601189],

    name: "Como Como",
    rangeId: "meisha",
    categoryId: "restaurant",

    description:
      "An All-day restaurant which provides high-grade foods and deserts from worldwide",

    signatureDishes: [
      {
        name: "Tapas",
        price: 56,
        image: "/images/como-como/1.jpeg",
      },
      {
        name: "Pizza margarita",
        price: 62,
        image: "/images/como-como/2.jpeg",
      },
    ],

    authors: "Kelvin",
  },
  {
    location: [114.242033, 22.552466],

    name: "1881 Music Bar",
    rangeId: "shatoujiao",
    categoryId: "restaurant",

    description:
      "A music bar which locates beside the sea and serves delicious French and Italian foods",

    signatureDishes: [
      {
        name: "Spaghetti Bolognese",
        price: 58,
        image: "/images/1881-music-bar/1.jpeg",
      },
      {
        name: "Cream of mushroom soup",
        price: 38,
        image: "/images/1881-music-bar/2.jpeg",
      },
    ],

    authors: "Kelvin",
  },
  {
    location: [114.238483, 22.552328],

    name: "Mandarin Rest",
    originalName: "文华冰室",
    rangeId: "shatoujiao",
    categoryId: "restaurant",

    description: "A tea restaurant from HK",

    signatureDishes: [
      {
        name: "Four kinds of meat in one plate",
        price: 88,
        image: "/images/mandarin-rest/1.jpeg",
      },
      {
        name: "Fish fragrant eggplant pot",
        price: 39,
        image: "/images/mandarin-rest/2.jpeg",
      },
    ],

    authors: "Kelvin",
  },
  {
    location: [114.233109, 22.560735],

    name: "Saizeriya",
    originalName: "萨莉亚",
    rangeId: "shatoujiao",
    categoryId: "restaurant",

    description: "A cheap Italian restaurant",

    signatureDishes: [
      {
        name: "Baked Escargots",
        price: 13,
        image: "/images/saizeriya/1.jpeg",
      },
      {
        name: "Beef and Meat Sauce spaghetti",
        price: 16,
        image: "/images/saizeriya/2.jpeg",
      },
    ],

    streetViewUrl:
      "https://map.baidu.com/#panoid=09005700121709191346149168Y&panotype=street&heading=80.3&pitch=14.02&l=13&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%22154c1da7b2e5b38ec7f50da9%22%7D%7D",

    authors: "Kelvin",
  },
  {
    location: [114.304275, 22.616059],

    name: "The Wizard of Miyue Mid-Levels Forest Restaurant",
    rangeId: "meisha",
    categoryId: "restaurant",

    description:
      "A restaurant on the half way of the mountain and serves delicious Western foods",

    signatureDishes: [
      {
        name: "Naked eye steak",
        price: 258,
        image:
          "/images/the-wizard-of-miyue-mid-levels-forest-restaurant/1.jpeg",
      },
      {
        name: "Low temperature chicken breast and avocado salad",
        price: 65,
        image:
          "/images/the-wizard-of-miyue-mid-levels-forest-restaurant/2.jpeg",
      },
    ],

    authors: "Kelvin",
  },
  {
    location: [114.228155, 22.550222],

    name: "Xiangji Tea Restaurant",
    originalName: "祥记茶餐厅",
    rangeId: "shatoujiao",
    categoryId: "restaurant",

    description:
      "A kind of Cantonese hot pot restaurant which involves chickens and pork tripe",

    signatureDishes: [
      {
        name: "Pig stomach contain chicken",
        price: 188,
        image: "/images/xiangji-tea-restaurant/1.jpeg",
      },
      {
        name: "Curry fish ball",
        price: 13,
        image: "/images/xiangji-tea-restaurant/2.jpeg",
      },
    ],

    authors: "Kelvin",
  },
  {
    location: [114.238066, 22.551716],

    name: "Hyatt Regency Buffet",
    originalName: "海鲜烧烤自助餐厅（深圳凯悦酒店）",
    rangeId: "shatoujiao",
    categoryId: "restaurant",

    description: "It's famous for its scenery the ingredients are fresh",

    signatureDishes: [
      {
        name: "Lobster",
        image: "/images/hyatt-regency-buffet/1.jpeg",
      },
      {
        name: "Grilled lamb chop",
        image: "/images/hyatt-regency-buffet/2.jpeg",
      },
    ],

    authors: "Kelvin",
  },
  {
    location: [114.278977, 22.586023],

    name: "Shigonghui Seafood Restaurant",
    originalName: "师公会海鲜酒家",
    rangeId: "yantian",
    categoryId: "restaurant",

    description:
      "It's not a luxury restaurant but its seafood is famous across HK and Shenzhen due to its freshness and age",

    signatureDishes: [
      {
        name: "Fried rice with sea urchin",
        price: 68,
        image: "/images/shigonghui-seafood-restaurant/1.jpeg",
      },
      {
        name: "Golden pie",
        price: 36,
        image: "/images/shigonghui-seafood-restaurant/2.jpeg",
      },
    ],

    authors: "Kelvin",
  },
  {
    location: [114.232124, 22.552834],

    name: "Kaihuang Malaysia Durian Buffet",
    originalName: "开皇马来西亚熟榴莲自助餐厅",
    rangeId: "shatoujiao",
    categoryId: "restaurant",

    description:
      "It's a restaurant only serve durian and its corresponding products such as durian milkshake, durian chicken soup",

    signatureDishes: [
      {
        name: "Durian cake",
        image: "/images/kaihuang-malaysia-durian-buffet/1.jpeg",
      },
      {
        name: "Durian chicken soup",
        image: "/images/kaihuang-malaysia-durian-buffet/2.jpeg",
      },
    ],

    streetViewUrl:
      "https://map.baidu.com/#panoid=2500570012240211172927817OI&panotype=street&heading=149.86&pitch=12.74&l=13&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%22a0736d9aaa5b881acb213d71%22%7D%7D",

    authors: "Kelvin",
  },

  {
    location: [114.238515, 22.552584],

    name: "Four Seasons Loft International Hotel Apartment (Shenzhen Yihai City Mall)",
    originalName: "四季LOFT海景酒店公寓（深圳壹海城mall店）",
    rangeId: "shatoujiao",
    categoryId: "hotel",

    authors: "Kelvin",
  },
  {
    location: [114.241864, 22.553342],

    name: "Acotown Gulf International Hotel",
    originalName: "深圳雅庭海灣國際大酒店",
    rangeId: "shatoujiao",
    categoryId: "hotel",

    streetViewUrl:
      "https://map.baidu.com/#panoid=0900570012211230165850953HP&panotype=street&heading=18.75&pitch=13.82&l=13&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%2273b637e258875c2d2b3a9fbd%22%7D%7D",

    authors: "Kelvin",
  },
  {
    location: [114.23822, 22.552721],

    name: "Xilu LOFT Seaview Apartment (Shenzhen Haishan Subway Station Yihai City Branch)",
    originalName: "希芸LOFT海景公寓（深圳海山地鐵站壹海城店）",
    rangeId: "shatoujiao",
    categoryId: "hotel",

    authors: "Kelvin",
  },
  {
    location: [114.232323, 22.548629],

    name: "Langhua Executive Apartment (Shenzhen Yantian Shatoujiao Branch)",
    originalName: "朗華行政公寓（深圳市鹽田沙頭角店）",
    rangeId: "shatoujiao",
    categoryId: "hotel",

    authors: "Kelvin",
  },
  {
    location: [114.235629, 22.559357],

    name: "Yuelin Hotel",
    originalName: "深圳悦林酒店",
    rangeId: "shatoujiao",
    categoryId: "hotel",

    authors: "Kelvin",
  },
  {
    location: [114.232516, 22.548348],

    name: "Berman International Apartment ( Zhongying Street，Shenzhen)",
    originalName: "柏曼國際公寓（深圳中英街店）",
    rangeId: "shatoujiao",
    categoryId: "hotel",

    authors: "Kelvin",
  },
  {
    location: [114.238173, 22.551309],

    name: "Hyatt Regency Shenzhen Yantian",
    originalName: "深圳鹽田凱悦酒店",
    rangeId: "shatoujiao",
    categoryId: "hotel",

    authors: "Kelvin",
  },
  {
    location: [114.302521, 22.616696],

    name: "Miyue Shenzhen Tianlu Secret Wild Wizard Holiday Meisu",
    originalName: "蜜悦·深圳天麓祕野仙蹤度假美宿",
    rangeId: "meisha",
    categoryId: "hotel",

    authors: "Kelvin",
  },
  {
    location: [114.260822, 22.591853],

    name: "Shangyingxuan Hotel (Shenzhen Yantian Port honganwei Subway Station Store)",
    originalName: "深圳尚映風華酒店（鹽田港鴻安圍地鐵站店）",
    rangeId: "yantian",
    categoryId: "hotel",

    streetViewUrl:
      "https://map.baidu.com/#panoid=09005700122003271030286285O&panotype=street&heading=17.18&pitch=6.64&l=21&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%22d4ff848a8ba1c96426e0a0ee%22%7D%7D",

    authors: "Kelvin",
  },
  {
    location: [114.226034, 22.552203],

    name: "Yilong Hotel (Shenzhen Zhongying Street Shatoujiao Subway Station)",
    originalName: "藝龍酒店（深圳中英街沙頭角地鐵站店）",
    rangeId: "shatoujiao",
    categoryId: "hotel",

    streetViewUrl:
      "https://map.baidu.com/#panoid=0900570012211231103307389HP&panotype=street&heading=35.35&pitch=10.88&l=21&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%2243b7e889643eb67358f6be42%22%7D%7D",

    authors: "Kelvin",
  },

  {
    location: [114.214689, 22.577706],

    name: "Wutong Mountain",
    originalName: "梧桐山",
    rangeId: "shenzhen",
    categoryId: "park",

    description:
      "Wutong Mountain is a free tourist attraction in Luohu District of Shenzhen and is known as a good place to watch the sunrise in Shenzhen. It has beautiful natural scenery and a long history and culture. Mountaineers can enjoy the beautiful sunrise view and enjoy the peace and beauty of nature. At the same time, there are many farmhouses and small restaurants near Wutong Mountain, where you can taste authentic Cantonese food.",

    streetViewUrl:
      "https://map.baidu.com/#panoid=2500840012231122113859458OI&panotype=street&heading=46.68&pitch=0&l=21&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%2207a6f57c941fa781246e9826%22%7D%7D",

    authors: "Doris",
  },
  {
    location: [113.990037, 22.537252],

    name: "Oct East Tourism Resort",
    originalName: "东部华侨城旅游度假区",
    rangeId: "shenzhen",
    categoryId: "scenery",

    description:
      "Oct East Tourism Resort is one of the most interesting places in Shenzhen, including the Warrior Valley, Tea Valley leisure Park, Yunhai Valley Sports Park, theme hotel community and Tianlu Mansion. There are a variety of attractions in the scenic area, including theme hotels, expansion bases and expansion training facilities, as well as Yunhai Valley Sports Park and Tianlu Mansion. Oct East is not only an eco-tourism resort, but also a comprehensive national eco-tourism demonstration zone integrating leisure, sightseeing, outdoor sports, popular science education and ecological exploration.",

    authors: "Doris",
  },
  {
    location: [113.972981, 22.534662],

    name: "Window of the World",
    originalName: "世界之窗",
    rangeId: "shenzhen",
    categoryId: "scenery",

    description:
      "Window of the World is one of the tourist attractions in Shenzhen, located in the OCT by the Shenzhen Bay, covering an area of 480,000 square meters. Almost all the famous scenic spots in the world are included in the scenic spot, most of which are restored in accordance with a certain proportion. There are also folk songs and dances, large-scale performances and high-tech participatory entertainment projects, as well as night performances, which are very rich in activities. Windows of the World is good at innovation and has pioneered the development of participatory entertainment projects packaged with cultural themes. And there is a long beach walk in the scenic area, you can enjoy the beautiful natural scenery",

    streetViewUrl:
      "https://map.baidu.com/#panoid=2500890012230803213100734OI&panotype=street&heading=191.95&pitch=-15.39&l=21&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%22e41eb1fb40abb0b82fb96db2%22%7D%7D",

    authors: "Doris",
  },
  {
    location: [113.980295, 22.54159],

    name: "Shenzhen Happy Valley",
    originalName: "深圳欢乐谷",
    rangeId: "shenzhen",
    categoryId: "amusement-park",

    description:
      "Shenzhen Happy Valley is a theme park under the Overseas Chinese Town Group, including Spain Square, Cartoon City, Adventure Mountain, Happy Island, gold mine town and other eight theme areas. There is a rich variety of projects here, such as thrilling projects, adventure mountains and so on. Perfect for people and families who love excitement and challenge their nerves. At the same time, there are projects suitable for children to play, such as parent-child projects. Happy Valley is a modern Chinese theme park that integrates participation, viewing, entertainment and interest.",

    authors: "Doris",
  },
  {
    location: [114.327663, 22.600805],

    name: "Xiaomeisha",
    originalName: "小梅沙",
    rangeId: "meisha",
    categoryId: "park",

    description: `Xiaomeisha is a beach near Dapeng Bay, Yantian District, Shenzhen, known as the "Oriental Hawaii". It has clear waters and fine sandy beaches in a secluded environment. Xiaomeisha Sea World is a place to watch rare animals and participate in water activities. In addition, Xiaomeisha has about 800 meters wide beach, you can participate in beach barbecue, jet ski, submarine diving and other recreational activities. Xiaomeisha also has beautiful natural scenery, such as surrounded by green mountains and blue sea water, which is very suitable for vacation and leisure.`,

    streetViewUrl:
      "https://map.baidu.com/#panoid=09005700122003271107582375O&panotype=street&heading=78.73&pitch=-15.39&l=21",

    authors: "Doris",
  },
  {
    location: [113.986833, 22.53297],

    name: "锦绣中华·民俗文化村",
    originalName: "锦绣中华·民俗文化村",
    rangeId: "shenzhen",
    categoryId: "scenery",

    description:
      "It is one of the earliest cultural theme parks in China and the largest and richest real-life miniature attractions in the world. There are 82 scenic spots distributed according to the location of China, covering a total area of 400 hectares. Scenic spots are built at a ratio of 1:15, including scenic spots, scenic spots and folk houses. Each scenic spot is distributed according to the location of the map of China, like a huge map of China. These attractions are very distinctive, allowing people to swim from the solemn Ming Tombs to the poetic Li River landscape in a few dozen steps, from looking up the largest Buddha statue, Leshan Buddha, to the longest cave gallery, Dunhuang Mogao Grottoes. In addition to the scenic spots, there are 56 ethnic architectural styles, and each scenic spot has free performances of different ethnic groups. In the Splendid China Scenic Spot, you can feel the unique charm of China.",

    authors: "Doris",
  },
  {
    location: [114.058673, 22.553594],

    name: "Lianhuashan Park",
    originalName: "莲花山公园",
    rangeId: "shenzhen",
    categoryId: "park",

    description: `Lianhuashan Park is an old park in Shenzhen and one of the classic scenic spots of red tourism in China. It is located in the downtown area, covers an area of 194 hectares and was built in 92. Lianhuashan Park has a number of squares, mainly with a variety of tropical plants, and a large area of grass. The park was selected into the national Red Tourist Attractions list and was rated as a national 4A-level tourist attraction. Due to its beautiful natural environment and rich cultural connotation, Lianhuashan Park attracts a large number of tourists to enjoy and play.
In the east and southeast of Lianhuashan Park, two lawn square scenic spots of 200,000 square meters with large areas of grass and micro-topography are formed. The south of Lianhuashan Park is a coconut wind forest lawn scenic spot of 80,000 square meters, composed mainly of lawns and palm plants with tropical and subtropical customs. The north side of the Coconut Wind Forest Lawn scenic area is an artificial lake scenic area of 50,000 square meters (of which the lake area is 30,000 square meters and the lakeside green area is 20,000 square meters). About 20,000 square meters of recreational green space have been built in the western part of Lianhuashan Park. The northeastern part of Lianhuashan Park is separated from Caitian Village by only one road, which is two sparse forest and grass fields with a total of about 140,000 square meters. The northwest of Lianhua Mountain Park is opposite to Lianhua North Village, with an area of about 60,000 square meters of grass.`,

    streetViewUrl:
      "https://map.baidu.com/#panoid=2500820012240421154233592OI&panotype=street&heading=354.71&pitch=0&l=21",

    authors: "Doris",
  },
  {
    location: [114.103888, 22.656694],

    name: "Gankeng",
    originalName: "甘坑古镇",
    rangeId: "shenzhen",
    categoryId: "scenery",

    description: `Gankeng is an ancient Hakka village with a long history and is one of the "Top ten ancient Hakka villages in Shenzhen". In the local Hakka language of Shenzhen, "pit" refers to small streams and ditches, and the Hakka often use pits and drains together, with the word "pit pit asphalt", Gan pit springs are all over, and streams are sweet, so it is called Gan pit. The ancient town of Gankeng was once a Hakka settlement, with many ancient buildings and connected houses. There has been more than 120 years of vicissitudes of the south Xiang building; There was the No.1 Yuan Mansion built during the Yongzheng Reign; Phoenix Valley, a group of Huizhou style buildings; There are also towers, towers, stilts and other buildings in the landscape, and hundreds of years of Hakka townhouses formed a unique carrier of Hakka culture. Gankeng Ancient Town is an important window to understand the indigenous culture of Shenzhen.`,

    authors: "Doris",
  },
  {
    location: [113.921429, 22.543019],

    name: "Nantou Ancient City",
    originalName: "南头古镇",
    rangeId: "shenzhen",
    categoryId: "scenery",

    description: `Nantou Ancient City includes archway, South gate, Xin 'an County Government, Xin 'an Prison, coastal defense Office, Dongguan Guild Hall, Guandi Temple, Wen Tianxiang Temple, opium Hall, official hall, Juxiu Building, Yili pawn shop, Tao Mi Gong Bank and other more than 10 cultural and historical landscapes. Since the establishment of Dongguan County in the sixth year of Xianhe in the Eastern Jin Dynasty (331), it has a history of nearly 1,700 years. It is the seat of Bao 'an County Government before the establishment of the Shenzhen Special Zone, known as the "historical and cultural root of Shenzhen and Hong Kong", the "capital of East Guangdong, the source of Hong Kong and Macao", and the origin of Shenzhen city, and the ancient city of Nantou bears witness to the "migration and return" of Shenzhen center.`,

    streetViewUrl:
      "https://map.baidu.com/#panoid=09005700122003231520244865O&panotype=street&heading=47.18&pitch=10.99&l=21&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%2242ee0c27f0e8d26b36b06cb1%22%7D%7D",

    authors: "Doris",
  },
  {
    location: [113.95596, 22.541865],

    name: "万象天地",
    originalName: "万象天地",
    rangeId: "shenzhen",
    categoryId: "shopping-mall",

    description:
      "The brand planning of international fashion, specialty catering, children's world and humanistic life has brought nearly 300 stores and more than 1,000 brands, of which about 30% of the brands are entering Shenzhen for the first time. The project has also introduced unique formats and brands such as the first self-operated humanistic theater of China Resources Land and the first Eslite life in South China. Create a unique consumption and lifestyle experience for Shenzhen consumers.",

    streetViewUrl:
      "https://map.baidu.com/#panoid=09005700122003201341403105O&panotype=street&heading=308.52&pitch=21.91&l=21&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%226176ebf72b33066c7369d35a%22%7D%7D",

    authors: "Doris",
  },
  {
    location: [114.110687, 22.539227],

    name: "Mixc",
    originalName: "万象城",
    rangeId: "shenzhen",
    categoryId: "shopping-mall",

    description: `Mixc is a high-quality shopping center developed by China Resources Group, one of The world's top 500 enterprises, and a leader in China's shopping center industry. Vientiane City advocates "one-stop" consumption and "experiential" shopping, bringing consumers a new consumption concept and life experience.`,

    authors: "Doris",
  },
  {
    location: [113.987934, 22.523417],

    name: "Happy Coast",
    originalName: "欢乐海岸",
    rangeId: "shenzhen",
    categoryId: "amusement-park",

    description:
      "Happy Coast gathers the wisdom of global masters, takes Marine culture as the theme, ecological environmental protection as the concept, innovative business as the main body, and creates a healthy urban coastal life as the dream, pioneering the integration of theme business with coastal tourism, leisure and entertainment and cultural creativity, integrating retail, catering, entertainment, office, apartment, hotel, wetland park and other diversified business forms. Form a unique new business model of business + entertainment + culture + tourism + ecology, truly realize the value combination of theme business, fashion entertainment, and healthy life, and promote the innovation and development of China's theme business with practical actions.",

    streetViewUrl:
      "https://map.baidu.com/#panoid=2500660012230316102434051OI&panotype=street&heading=235.33&pitch=0&l=21&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%2223c63ca82ceb6c9607026fca%22%7D%7D",

    authors: "Doris",
  },
  {
    location: [113.887665, 22.55215],

    name: "Shenzhen Uniwalk Qianhai",
    originalName: "壹方城",
    rangeId: "shenzhen",
    categoryId: "shopping-mall",

    description: `Shenzhen Uniwalk Qianhai is a 360,000 square meters multi-theme experience MALL operated by Hongrongyuan One Square Shopping Mall. Opened on October 28, 2017, as the largest single volume shopping center in Shenzhen, the project has ranked first in Shenzhen in terms of passenger flow and top five in South China in terms of sales since its opening. The project integrates the eight business forms of gluttony food, social gathering, quality life, fashion trend, entertainment audio-visual, children's growth, humanistic creativity, sports and leisure, and creates a "large and comprehensive" one-stop shopping experience to become a light luxury shopping highland and a trendy life destination, creating a new experience of extraordinary quality and multiple themes.`,

    authors: "Doris",
  },
  {
    location: [113.883757, 22.54458],

    name: "Shenzhen Happy Harbor",
    originalName: "欢乐港湾",
    rangeId: "shenzhen",
    categoryId: "park",

    description: `Located in the southern coastal zone of Bao 'an Central District, Shenzhen, Happy Harbor is a new-generation cultural and tourism complex product created by OCT Group with 36 years of urban operation experience. With a total investment of more than 10 billion yuan and a total area of about 380,000 square meters, the project adheres to the four development concepts of international vision, original design, open sharing and green ecology. Build 270,000 ㎡ waterfront cultural park, 120,000 ㎡ waterfront experience commercial block, 128m high "Bay Area Light" Ferris wheel, Shenzhen Binhai Performing Arts Center with a total construction area of 38,000 ㎡, JW Marriott Hotel with a construction area of 10,000 ㎡, and other diversified business types. Is a collection of coastal leisure, cultural tourism, art experience, ecological office as one of the "heart of the international Bay Area coastal life creative"`,

    streetViewUrl:
      "https://map.baidu.com/#panoid=2500690012230312174440100OI&panotype=street&heading=70.67&pitch=0&l=21&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%227f03229f49de6d16f90cad0a%22%7D%7D",

    authors: "Doris",
  },
  {
    location: [114.070306, 22.557091],

    name: "UpperHills",
    originalName: "深业上城",
    rangeId: "shenzhen",
    categoryId: "shopping-mall",

    description:
      "UpperHills is a large urban complex integrating industrial research and development, apartments, hotels and businesses. Upon completion, it will become a landmark building complex in the North district of Shenzhen CBD. The project is located in the central district of Futian, Shenzhen, overlooking Tanglang Mountain to the north, Sungang West Road and Central Park to the south, Huanggang Road and Bijiashan Park to the east, Caitian Road and Lianhuashan Park to the west. Two large ecological link greenways connect Lianhua Mountain, Bijia Mountain and the project, allowing the owner to walk to the park in 10 minutes",

    streetViewUrl:
      "https://map.baidu.com/#panoid=2500570012230517200402197OI&panotype=street&heading=250.95&pitch=0&l=21&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%22ea431cf8ff3da6d0a30464ba%22%7D%7D",

    authors: "Doris",
  },
  {
    location: [114.131127, 22.673839],

    name: "Longgang Wanda Plaza",
    originalName: "龙岗万达广场",
    rangeId: "shenzhen",
    categoryId: "shopping-mall",

    description: `The building area of Longgang Wanda Plaza is 305,000 square meters. The whole building is divided into 8 floors, of which 6 floors are above ground and 2 floors are underground
Longgang Wanda Plaza is the first fourth-generation Wanda Plaza in China, with the world's highest and longest indoor escalator 64 meters long and 30 meters high in the mall's atrium`,

    streetViewUrl:
      "https://map.baidu.com/#panoid=2300570012221209173407345OI&panotype=street&heading=229.38&pitch=0&l=21&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%22b35d64d74673255981a12e93%22%7D%7D",

    authors: "Doris",
  },
  {
    location: [114.11584, 22.544102],

    name: "Dongmen Old Street",
    originalName: "东门老街",
    rangeId: "shenzhen",
    categoryId: "scenery",

    description: `Dongmen Old Street, the full name of Shenzhen Dongmen Commercial Pedestrian Street, the scope of north to Lixin Road, south to Shennan Road, east to Dongmen Middle Road, west to Xinyuan Road, a total area of 176,000 square meters. Dongmen Old Street has been a famous and important market since the Ming and Qing dynasties. Located between Hong Kong and Guangzhou, Dongmen Old Street has a unique geographical environment, a mixture of Chinese and foreign cultures, and a gathering of people from Guangdong's three major ethnic groups, Guangfu, Hakka and Chaoshan. The roots of ancient Shenzhen are in the old city of Nantou, while the roots of modern Shenzhen are in the "Shenzhen Ruins". Dongmen is also called Shenzhen Hui, Shenzhen is based on Dongmen Old Street development. Dongmen Old Street truly records a period of history of Shenzhen's urban development, is a historical stage witness of modern Shenzhen, is a component of Shenzhen's historical and cultural accumulation, and is the root of Shenzhen people. In the past, the whole Dongmen area of Shenzhen Hui was covered with Guangfu shophouses and Guang-style buildings, such as the Guangfu Lingnan architectural style of Siyue Academy and Style Street`,

    streetViewUrl:
      "https://map.baidu.com/#panoid=0900570012220107115637063GG&panotype=street&heading=129.08&pitch=-1.67&l=21&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%22dccadf553a2fd61817b54b67%22%7D%7D",

    authors: "Doris",
  },
  {
    location: [113.916697, 22.483032],

    name: "Sea World",
    originalName: "海上世界",
    rangeId: "shenzhen",
    categoryId: "scenery",

    description: `Sea world, an international coastal city with everything. As the flagship of China Merchants Group's 60 billion yuan reconstruction of new Shekou, Sea World has a total construction area of 1 million square meters, integrating "business office, leisure and entertainment, dining and shopping, hotels, vacations, residences, culture and art, etc.". New projects include: The landmark building with a height of 211 meters, China Merchants Square, Financial Center Phase II, Prince Plaza Phase II, 3 Grade A office projects, high-end serviced apartments and senior residential projects, the Cultural and art Center designed by architect 槇 Wenyan, Hilton Hotel, Sea World Plaza and Binhai Park, as well as the renovation of Minghua Wheel, Each project is scheduled to be completed by 2015. Supporting subway Line 2 and 12.`,

    streetViewUrl:
      "https://map.baidu.com/#panoid=2300570012230119195207893OI&panotype=street&heading=78.61&pitch=0.5&l=21&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%22c587d21816ea3553c4f0255e%22%7D%7D",

    authors: "Doris",
  },
  {
    location: [113.950025, 22.506617],

    name: "Talent",
    originalName: "深圳人才公园",
    rangeId: "shenzhen",
    categoryId: "park",

    description: `Talent is an important gene of Shenzhen's urban development, as the country's first talent-themed park, the park is Shenzhen in a unique way, to pay tribute to the past three decades for the development of Shenzhen's outstanding talents, but also in the context of today's cities to launch "grab the people war", representing Shenzhen's attention to talent and the determination to introduce talent. Highlight the theme broadcast editor Shenzhen Talent Park everywhere can be seen talent elements, fully highlighting the theme of talent. On the east side of the park is the Talent Star Bridge across the lake, above which stands the star light column of 30 Shenzhen outstanding figures, in order to commemorate this group of outstanding talents who have made great contributions to Shenzhen. The west side of the lake in the center of the park is the talent and historical landscape wall. The red iron plate is carved into characters, listing the evolution of the word, shape and meaning of "talent" in ancient and modern China and the relevant famous works, and there are dozens of characters written "talent" to annotate talents from multiple angles. The PI bridge on the south side of the park, the railings on both sides are inlaid with 2017 decimal places of PI, which means the construction and opening in 2017, representing the infinite beautiful vision for the future. Talent Merit Wall, talent Park record, talent sculpture Park, talent experience hall, talent story collection record and display the great course of Shenzhen's 37 years of reform and opening up, the struggle history and development history of Shenzhen talents, in order to commemorate the glorious past of Shenzhen talents, and inspire today's talents to continue to open up. In addition to the landscape, the park has also designed practical functional Spaces, respectively, Qiuxian Pavilion and Qunying Hui. Qiuxian Pavilion is positioned as the conference center of the park, with academician lecture hall, multi-function hall, talent coffee, talent book bar, etc. The main functions include holding academic reports and project roadshows. The function of Qunying Hui is positioned as a park activity center, with maker space, fitness center, talent experience hall, and "Deep Love Talent" experience hall. The combination of ornamental value and practical value of talent park further highlights the value of talent.`,

    streetViewUrl:
      "https://map.baidu.com/#panoid=2500570012240114162507994OI&panotype=street&heading=145.01&pitch=0&l=21&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%22db3f081166d4314596f08c51%22%7D%7D",

    authors: "Doris",
  },
  {
    location: [113.972602, 22.518968],

    name: "Shenzhen Bay Park",
    originalName: "深圳湾公园",
    rangeId: "shenzhen",
    categoryId: "park",

    description:
      "Shenzhen Bay Park, which took 8 years of planning, design and construction, not only provides citizens and tourists with multi-functional activities such as leisure and entertainment, fitness, sightseeing and experiencing nature, but also becomes a symbol of the charm and image of Shenzhen's modern coastal city. Shenzhen Bay Park is really good for walking and cycling, the coastal bike belt is 20 kilometers long, but motor vehicles are not allowed in the park.",

    streetViewUrl:
      "https://map.baidu.com/#panoid=2500990012240214111611515OI&panotype=street&heading=122.08&pitch=0&l=21&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%22df2fbad8ddee98cfe9f85366%22%7D%7D",

    authors: "Doris",
  },
  {
    location: [113.833999, 22.593516],

    name: "Xiwan Mangrove Park",
    originalName: "西湾红树林湿地公园",
    rangeId: "shenzhen",
    categoryId: "park",

    description: `The park (Phase I) is located along the west seawall, with a length of about 705 meters and an area of about 93,000 square meters, of which the land area is about 33,000 square meters and the sea area is about 60,000 square meters. There are 3 sea view boardwalk, 4 sea steps, 2 view boardwalk, 19,300 square meters of green, 123 parking Spaces. The park (Phase I) has a total of 16 attractions. The design of Xiwan Mangrove Park highlights natural ecology, leisure and recreation, focusing on Lingnan style and coastal elements, with 7.5km greenway main loop and 32 hectares of wetland park. As an important strategic node on the 45 km golden coastline, Xiwan Mangrove Park has opened the era of Baoan's "pro-sea"`,

    authors: "Doris",
  },
  {
    location: [114.174834, 22.576476],

    name: "Xianhu Botanical Garden",
    originalName: "仙湖植物园",
    rangeId: "shenzhen",
    categoryId: "park",

    description:
      "As of 2012, Xianhu Botanical Garden has preserved about 8,000 species of plants, and has 21 plant special gardens, including cycad conservation Center, magnolia Garden, rare tree garden, palm garden, bamboo area, shade plant area, desert plant area, hundred orchard, aquatic botanical garden, peach garden, gymnosperms area, and bonsai Garden.\nThe whole park is divided into heaven and earth scenic spot, lake area, temple area, desert plant area, fossil forest scenic spot and pine, cypress and cuckoo scenic spot. There are more than a dozen garden attractions such as Dongtian, Liangyi Pavilion, Jade Belt Bridge, Dragon Tower, Tao Pavilion, Range Pavilion, Butterfly Valley Orchid, etc., and a unique paleontology museum is built.",

    authors: "Doris",
  },
];

export default places;
