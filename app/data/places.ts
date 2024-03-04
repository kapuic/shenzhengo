import { type Place } from "./schema";

const places: Place[] = [
  {
    location: [114.300844, 22.600616],

    name: "Vanke East Coast Exercising Park",
    originalName: "东海岸运动公园",
    rangeId: "nearby",
    categoryId: "park",

    description:
      "Vanke East Coast Exercising Park is a park where you can walk, run, and relax. There are lots of lotus and trees; the park is usually quiet and the air feels fresh.",

    authors: "Oliver",
  },
  {
    location: [114.312739, 22.59973],

    name: "Uphill Community Park",
    originalName: "鹅公岌社区公园",
    rangeId: "nearby",
    categoryId: "park",

    description:
      "There is a beautiful uphill trail surrounded by trees in this park where you can walk to the top of a hill. On the top, there is a nice lookout spot where you can look down at all the Dameisha.",

    authors: "Oliver",
  },
  {
    location: [114.324042, 22.595271],

    name: "Xiaomeisha Seashore Walkway",
    originalName: "小梅沙海滨栈道",
    rangeId: "nearby",
    categoryId: "walkway",

    description:
      "This is a well-established walkway across Dameisha and Xiaomeisha with beautiful views of the sea. This walkway usually don’t have many people, so you can enjoy many beautiful sight seeing spots along the walk way with little disturbance!",

    authors: "Oliver",
  },
  {
    location: [114.305176, 22.606662],

    name: "Fjord Walkway",
    originalName: "峡湾栈道",
    rangeId: "nearby",
    categoryId: "walkway",

    description:
      "This is another long walkway in Dameisha where you can hike while enjoying beautiful sea views.",

    authors: "Oliver",
  },
  {
    location: [114.307954, 22.592429],

    name: "Dameisha Seashore Park",
    originalName: "大梅沙海滨公园",
    rangeId: "nearby",
    categoryId: "park",

    description: `Oliver: This is a park at the Dameisha beach enjoy the sea view and relax on the beach. Here, you can access a long walkway connected to the Xiaomeisha Seashore Walkway and other parts of the Dantean District.
Doris: Dameisha Seaside Park is a seaside park in Yantian District of Shenzhen City, located in the embrace of mountains on three sides, the middle of the open and gentle, one side facing the sea. The park is divided into swimming area, sports area, leisure area, entertainment area, barbecue area and other areas. Here is the longest beach in Shenzhen, the water is clear, the beach is vast, the sand is soft, and there are water ski ropeway, motorboat, ATV, water parachute, beach volleyball, beach football and other recreational projects. The park also has shopping center, shower storage, catering supply, leisure tea, swimming equipment rental, security, life saving and other supporting services.`,

    authors: ["Oliver", "Doris"],
  },

  // {
  //   location: [114.307954, 22.592429],

  //   name: "Dameisha Park",
  //   originalName: "大梅沙",
  //   rangeId: "nearby",
  //   categoryId: "park",

  //   description:
  //     "Dameisha park is the biggest tourist attraction in the area. You can enjoy the beach and participate in numerous kinds of activities in the park, including water sports.",

  //   author: "Oliver",
  // },
  {
    location: [114.311617, 22.595082],

    name: "Dameisha Beach Waterpark",
    originalName: "大梅沙海滨公园海滩水乐园",
    rangeId: "nearby",
    categoryId: "amusement-park",

    description:
      "This is a park built on the Dameisha beach for children to play on water. There are small waterslides.",

    authors: "Oliver",
  },
  {
    location: [114.309256, 22.597907],

    name: "Mid-lake Park",
    originalName: "内湖公园",
    rangeId: "nearby",
    categoryId: "park",

    description:
      "This is the park beside the VMA campus, going across the Dameisha Outlets. You can enjoy the beautiful scenery of the late and relax under the sunlight. You can see black swans if you are lucky!",

    authors: "Oliver",
  },

  {
    location: [114.30482, 22.601422],

    name: "Meisha Hospital",
    originalName: "梅沙医院",
    rangeId: "nearby",
    categoryId: "hospital",

    description:
      "This is the closest public hospital to the Dameisha community. It has complete services and equipments for a variety of treatments.",
    coverImage: "/images/meisha-hospital/cover.png",

    authors: "Oliver",
  },
  {
    location: [114.305151, 22.595686],

    name: "Naber Pharmacy",
    originalName: "南北药行",
    rangeId: "nearby",
    categoryId: "pharmacy",

    authors: "Oliver",
  },
  {
    location: [114.305486, 22.600009],

    name: "China Associate Pharmacy",
    originalName: "中联大药房",
    rangeId: "nearby",
    categoryId: "pharmacy",

    authors: "Oliver",
  },
  {
    location: [114.31046, 22.599214],

    name: "Wanchun Pharmacy",
    originalName: "万春堂",
    rangeId: "nearby",
    categoryId: "pharmacy",

    authors: "Oliver",
  },

  {
    location: [114.305833, 22.595824],

    name: "Coconut Chicken",
    originalName: "良禽择木",
    rangeId: "nearby",
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
    rangeId: "nearby",
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

    authors: "Rachel",
  },
  {
    location: [114.308212, 22.594924],

    name: "Mcdonald’s",
    originalName: "麦当劳",
    rangeId: "nearby",
    categoryId: "fast-food",

    coverImage: "/images/mcdonalds/cover.jpeg",

    authors: "Rachel",
  },
  {
    location: [114.308934, 22.596855],

    name: "Pizza Hut",
    originalName: "必胜客",
    rangeId: "nearby",
    categoryId: "fast-food",

    coverImage: "/images/pizza-hut/cover.jpeg",

    authors: "Rachel",
  },
  {
    location: [114.308057, 22.597201],

    name: "Burger King",
    originalName: "汉堡王",
    rangeId: "nearby",
    categoryId: "fast-food",

    coverImage: "/images/burger-king/cover.jpeg",

    authors: "Rachel",
  },
  {
    location: [114.305722, 22.593723],

    name: "Wugufang Roast Pigeon",
    originalName: "五谷坊烤乳鸽",
    rangeId: "nearby",
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

    authors: "Rachel",
  },
  {
    location: [114.308338, 22.598859],

    name: "Seaside Sushi",
    originalName: "海边的寿司店",
    rangeId: "nearby",
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
    rangeId: "nearby",
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

    authors: "Rachel",
  },
  {
    location: [114.306352, 22.595529],

    name: "Yarra Café",
    originalName: "雅拉画廊咖啡",
    rangeId: "nearby",
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
    rangeId: "nearby",
    categoryId: "beverage",

    description: "There is also a Starbucks in Dameisha!",

    authors: "Oliver",
  },
  {
    location: [114.308698, 22.594092],

    name: "Time",
    originalName: "研磨时光",
    rangeId: "nearby",
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
    rangeId: "nearby",
    categoryId: "fitness",

    coverImage: "/images/dameisha-skydiving-base/cover.jpeg",

    authors: "Oliver",
  },
  {
    location: [114.309633, 22.594766],

    name: "Dameisha Yacht Service Center",
    originalName: "大梅沙游艇旅游服务中心",
    rangeId: "nearby",
    categoryId: "fitness",

    coverImage: "/images/dameisha-yacht-service-center/cover.jpeg",

    authors: "Oliver",
  },
  {
    location: [114.312238, 22.598236],

    name: "Dameisha Yacht & Sailing Rental Center",
    originalName: "大梅沙游艇帆船出租中心",
    rangeId: "nearby",
    categoryId: "fitness",

    coverImage: "/images/dameisha-yacht-sailing-rental-center/cover.jpeg",

    authors: "Oliver",
  },
  {
    location: [114.311454, 22.597956],

    name: "Yijing Surfing",
    originalName: "逸景电动冲浪俱乐部",
    rangeId: "nearby",
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
    rangeId: "citywide",
    categoryId: "shopping-mall",

    description: "A Yantian shopping mall.",

    authors: "Rachel",
  },
  {
    location: [114.109696, 22.540133],

    name: "The MiXC",
    originalName: "罗湖万象城",
    rangeId: "citywide",
    categoryId: "shopping-mall",

    description: "A Luohu shopping mall.",

    authors: "Rachel",
  },
  {
    location: [114.054007, 22.533569],

    name: "COCO Park",
    originalName: "COCO Park",
    rangeId: "citywide",
    categoryId: "shopping-mall",

    description:
      "COCO Park is the most fashionable shopping center in Shenzhen, integrating dining, shopping, leisure and entertainment. It has more than 200 international and domestic well-known brands. The first floor is the Yoshinoshima supermarket, international chain catering, jewelry accessories, personal care, home life, video and music, gift shop. On the first floor, there are international boutique clothing stores, jewelry, watches, classic accessories stores, China Mobile Information Life Hall, COCO open-air International Bar Street. On the second floor are business casual clothing, fashion women's clothing, leisure sports city, international specialty dining, popular accessories, home life, audio-visual gift shop and Broadway Cinema. The third floor is a high-end food concept restaurant and beauty care SPA. Weifang Taihua City COCO PARK is located in the south side of Taihua City Holiday Plaza podium building, through the beautiful music fountain and landscape water curtain, next to an entertainment and food center that runs through and echoes the whole Taihua City. There is a large landscape hollow in front of the door, which looks like a spectacular dynamic glass box. It will become a new fashion party base for entertainment and leisure in Weifang. There is the first large-sized IMAX large-screen theater spanning three floors in Shandong Province, a super-sized disco, a bar nightclub, a pool room and a number of medium-sized luxury theme Chinese and Western restaurants.",

    authors: ["Rachel", "Doris"],
  },
  {
    location: [113.935172, 22.517058],

    name: "Coastal City",
    originalName: "海岸城",
    rangeId: "citywide",
    categoryId: "shopping-mall",

    description:
      "Shenzhen Coastal City is located in the commercial and cultural center of Nanshan District, close to five main urban roads in Nanshan District, such as Binhai Avenue, Nanhai Avenue, Houhai Avenue, Houhaibin Road and Chuangye Road. Coast City consists of East office building, Coast City West office building, Coast City shopping center and coast style street, which is the largest comprehensive business and commercial project in the west of Shenzhen, and is also the largest indoor shopping, leisure and entertainment center in Shenzhen so far. The total investment of Coastal City is about 2 billion yuan, and the total construction area is about 300,000 square meters. Among them: shopping center about 120,000 square meters; About 140,000 square meters of office space; The commercial street is about 40,000 square meters. Coast City has about 2,000 underground parking Spaces. According to the China Shopping Center rating evaluation standard in 2019, it was rated as a national five-star shopping center.",

    authors: ["Rachel", "Doris"],
  },
  {
    location: [114.314845, 22.597653],

    name: "Intercontinental Shenzhen Dameisha Resort",
    originalName: "大梅沙洲际酒店",
    rangeId: "nearby",
    categoryId: "hotel",

    coverImage: "/images/intercontinental-shenzhen-dameisha-resort/cover.jpeg",

    authors: "Hao Du",
  },
  {
    location: [114.27579, 22.631594],

    name: "The Interlaken OCT Hotel",
    originalName: "东部华侨城茵特拉根酒店",
    rangeId: "nearby",
    categoryId: "hotel",

    coverImage: "/images/interlaken-oct-hotel/cover.jpeg",

    authors: "Hao Du",
  },
  {
    location: [114.310454, 22.598002],

    name: "Shenzhen Dameisha Kingkey Palace Hotel",
    originalName: "深圳大梅沙京基海湾酒店",
    rangeId: "nearby",
    categoryId: "hotel",

    coverImage: "/images/kingkey-palace-hotel/cover.jpeg",

    authors: "Hao Du",
  },
  {
    location: [114.30655, 22.593824],

    name: "Hilton Hampton",
    originalName: "喜来登欢朋酒店",
    rangeId: "nearby",
    categoryId: "hotel",

    coverImage: "/images/hilton-hampton/cover.png",

    authors: "Hao Du",
  },
  {
    location: [114.30598, 22.59289],

    name: "Vienna International Hotel",
    originalName: "维也纳国际酒店",
    rangeId: "nearby",
    categoryId: "hotel",

    coverImage: "/images/vienna-international-hotel/cover.png",

    authors: "Hao Du",
  },
  // {
  //   location: [114.305634, 22.591975],

  //   name: "Green Tree Alliance Hotel",
  //   originalName: "格林联盟酒店",
  //   rangeId: "nearby",
  //   categoryId: "hotel",

  //   author: "Hao Du",
  // },
  {
    location: [114.310054, 22.599981],

    name: "Pattaya Hotel",
    originalName: "芭提雅酒店",
    rangeId: "nearby",
    categoryId: "hotel",

    coverImage: "/images/pattaya-hotel/cover.png",

    authors: "Hao Du",
  },
  {
    location: [114.30598, 22.59289],

    name: "Vienna Hotel",
    originalName: "维也纳酒店",
    rangeId: "nearby",
    categoryId: "hotel",

    coverImage: "/images/vienna-hotel/cover.png",

    authors: "Hao Du",
  },
  {
    location: [114.303333, 22.603265],

    name: "Leyoujia.com",
    originalName: "乐有家",
    rangeId: "nearby",
    categoryId: "apartment-rental",

    coverImage: "/images/leyoujia/cover.png",

    authors: "Hao Du",
  },
  {
    location: [114.305604, 22.601214],

    name: "Zhongyuan Real Estate",
    originalName: "中原地产",
    rangeId: "nearby",
    categoryId: "apartment-rental",

    coverImage: "/images/zhongyuan-real-estate/cover.png",

    authors: "Hao Du",
  },
  {
    location: [114.313683, 22.599189],

    name: "PinAn Bank",
    originalName: "平安银行",
    rangeId: "nearby",
    categoryId: "bank",

    coverImage: "/images/pinan-bank/cover.png",

    authors: "Hao Du",
  },
  {
    location: [114.307825, 22.594095],

    name: "CCB ATM",
    originalName: "建行自助取款机",
    rangeId: "nearby",
    categoryId: "atm",

    coverImage: "/images/ccb-atm/cover.png",

    authors: "Hao Du",
  },
  {
    location: [114.311149, 22.599617],

    name: "Meisha Police Station",
    originalName: "梅沙派出所",
    rangeId: "nearby",
    categoryId: "police",

    coverImage: "/images/meisha-police-station/cover.png",

    authors: "Hao Du",
  },
  {
    location: [114.305297, 22.59448],

    name: "XLCT Pharmacy Shop",
    originalName: "杏林大药房",
    rangeId: "nearby",
    categoryId: "pharmacy",

    coverImage: "/images/xlct-pharmacy-shop/cover.png",

    authors: "Hao Du",
  },
];

export default places;
