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

    author: "Oliver",
  },
  {
    location: [114.312739, 22.59973],

    name: "Uphill Community Park",
    originalName: "鹅公岌社区公园",
    rangeId: "nearby",
    categoryId: "park",

    description:
      "There is a beautiful uphill trail surrounded by trees in this park where you can walk to the top of a hill. On the top, there is a nice lookout spot where you can look down at all the Dameisha.",

    author: "Oliver",
  },
  {
    location: [114.324042, 22.595271],

    name: "Xiaomeisha Seashore Walkway",
    originalName: "小梅沙海滨栈道",
    rangeId: "nearby",
    categoryId: "walkway",

    description:
      "This is a well-established walkway across Dameisha and Xiaomeisha with beautiful views of the sea. This walkway usually don’t have many people, so you can enjoy many beautiful sight seeing spots along the walk way with little disturbance!",

    author: "Oliver",
  },
  {
    location: [114.305176, 22.606662],

    name: "Fjord Walkway",
    originalName: "峡湾栈道",
    rangeId: "nearby",
    categoryId: "walkway",

    description:
      "This is another long walkway in Dameisha where you can hike while enjoying beautiful sea views.",

    author: "Oliver",
  },
  {
    location: [114.307954, 22.592429],

    name: "Dameisha Seashore Park",
    originalName: "大梅沙海滨公园",
    rangeId: "nearby",
    categoryId: "park",

    description:
      "This is a park at the Dameisha beach enjoy the sea view and relax on the beach. Here, you can access a long walkway connected to the Xiaomeisha Seashore Walkway and other parts of the Dantean District.",

    author: "Oliver",
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

    author: "Oliver",
  },
  {
    location: [114.309256, 22.597907],

    name: "Mid-lake Park",
    originalName: "内湖公园",
    rangeId: "nearby",
    categoryId: "park",

    description:
      "This is the park beside the VMA campus, going across the Dameisha Outlets. You can enjoy the beautiful scenery of the late and relax under the sunlight. You can see black swans if you are lucky!",

    author: "Oliver",
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

    author: "Oliver",
  },
  {
    location: [114.305151, 22.595686],

    name: "Naber Pharmacy",
    originalName: "南北药行",
    rangeId: "nearby",
    categoryId: "pharmacy",

    author: "Oliver",
  },
  {
    location: [114.305486, 22.600009],

    name: "China Associate Pharmacy",
    originalName: "中联大药房",
    rangeId: "nearby",
    categoryId: "pharmacy",

    author: "Oliver",
  },
  {
    location: [114.31046, 22.599214],

    name: "Wanchun Pharmacy",
    originalName: "万春堂",
    rangeId: "nearby",
    categoryId: "pharmacy",

    author: "Oliver",
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
        name: "椰子鸡",
        translation: "Coconut Chicken",
        price: 158,
        image: "/images/coconut-chicken/1.jpeg",
      },
      {
        name: "扬州炒饭",
        translation: "Yangzhou Fried Rice",
        price: 28,
        image: "/images/coconut-chicken/2.jpeg",
      },
      {
        name: "炒花甲",
        translation: "Stir-fried Clam",
        price: 38,
        image: "/images/coconut-chicken/3.jpeg",
      },
    ],

    author: "Rachel",
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
        name: "牛肉拉面",
        translation: "Ramen with Beef",
        price: 15,
        image: "/images/lanzhou-noodles/1.jpeg",
      },
      {
        name: "牛肉水饺",
        translation: "Beef Dumplings",
        price: 22,
        image: "/images/lanzhou-noodles/2.jpeg",
      },
      {
        name: "葱爆羊肉饭",
        translation: "Fried Lamb and Rice with Scallions",
        price: 30,
        image: "/images/lanzhou-noodles/3.jpeg",
      },
    ],

    author: "Rachel",
  },
  {
    location: [114.308212, 22.594924],

    name: "Mcdonald’s",
    originalName: "麦当劳",
    rangeId: "nearby",
    categoryId: "fast-food",

    coverImage: "/images/mcdonalds/cover.jpeg",

    author: "Rachel",
  },
  {
    location: [114.308934, 22.596855],

    name: "Pizza Hut",
    originalName: "必胜客",
    rangeId: "nearby",
    categoryId: "fast-food",

    coverImage: "/images/pizza-hut/cover.jpeg",

    author: "Rachel",
  },
  {
    location: [114.308057, 22.597201],

    name: "Burger King",
    originalName: "汉堡王",
    rangeId: "nearby",
    categoryId: "fast-food",

    coverImage: "/images/burger-king/cover.jpeg",

    author: "Rachel",
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
        name: "烤乳鸽",
        translation: "Roast Pigeon",
        price: 48,
        image: "/images/wugufang-roast-pigeon/1.jpeg",
      },
      {
        name: "客家酿豆腐",
        translation: "Yong Tau Foo",
        price: 38,
        image: "/images/wugufang-roast-pigeon/2.jpeg",
      },
      {
        name: "海胆炒饭",
        translation: "Fried Rice with Sea Urchin",
        price: 98,
        image: "/images/wugufang-roast-pigeon/3.jpeg",
      },
    ],

    author: "Rachel",
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
        name: "芒果炸虾卷",
        translation: "Fried Shrimp Rolls with Mango",
        price: 42,
        image: "/images/seaside-sushi/1.jpeg",
      },
      {
        name: "加州卷",
        translation: "California Roll",
        price: 36,
        image: "/images/seaside-sushi/2.jpeg",
      },
      {
        name: "日式煎饺",
        translation: "Japanese Pan-fried Dumpling",
        price: 12,
        image: "/images/seaside-sushi/3.jpeg",
      },
    ],

    author: "Rachel",
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
        name: "黑糖珠珠宝藏茶",
        translation: "Brown Sugar Boba Tea",
        price: 21,
        image: "/images/nayuki/1.jpeg",
      },
      {
        name: "草莓魔法棒",
        translation: "Strawberry Creamed Bread",
        price: 20,
        image: "/images/nayuki/2.jpeg",
      },
      {
        name: "霸气芝士葡萄",
        translation: "Grape Fruit Tea with Cheese",
        price: 28,
        image: "/images/nayuki/3.jpeg",
      },
    ],

    author: "Rachel",
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
        name: "拿铁",
        translation: "Latte",
        price: 32,
        image: "/images/yarra-cafe/1.jpeg",
      },
      {
        name: "精品手冲",
        translation: "Pour-over coffee",
        price: 68,
        image: "/images/yarra-cafe/2.jpeg",
      },
      {
        name: "澳白",
        translation: "Flat white coffee",
        price: 32,
        image: "/images/yarra-cafe/3.jpeg",
      },
    ],

    author: "Oliver",
  },
  {
    location: [114.308753, 22.598978],

    name: "Starbucks",
    originalName: "星巴克",
    rangeId: "nearby",
    categoryId: "beverage",

    description: "There is also a Starbucks in Dameisha!",

    author: "Oliver",
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
        name: "现榨香橙汁",
        translation: "Orange juice",
        price: 29,
        image: "/images/time/cover.jpeg",
      },
      {
        name: "现榨雪梨汁",
        translation: "Snow pear juice",
        price: 29,
        image: "/images/time/cover.jpeg",
      },
      {
        name: "太妃榛子拿铁",
        translation: "Toffee & hazel latte",
        price: 35,
        image: "/images/time/cover.jpeg",
      },
    ],

    author: "Oliver",
  },

  {
    location: [114.289192, 22.59186],

    name: "Dameisha Skydiving Base",
    originalName: "深圳大梅沙跳伞基地",
    rangeId: "nearby",
    categoryId: "fitness",

    coverImage: "/images/dameisha-skydiving-base/cover.jpeg",

    author: "Oliver",
  },
  {
    location: [114.309633, 22.594766],

    name: "Dameisha Yacht Service Center",
    originalName: "大梅沙游艇旅游服务中心",
    rangeId: "nearby",
    categoryId: "fitness",

    coverImage: "/images/dameisha-yacht-service-center/cover.jpeg",

    author: "Oliver",
  },
  {
    location: [114.312238, 22.598236],

    name: "Dameisha Yacht & Sailing Rental Center",
    originalName: "大梅沙游艇帆船出租中心",
    rangeId: "nearby",
    categoryId: "fitness",

    coverImage: "/images/dameisha-yacht-sailing-rental-center/cover.jpeg",

    author: "Oliver",
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

    author: "Oliver",
  },
  {
    location: [114.239208, 22.553136],

    name: "One City",
    originalName: "壹海城",
    rangeId: "citywide",
    categoryId: "shopping-mall",

    description: "A Yantian shopping mall.",

    author: "Rachel",
  },
  {
    location: [114.109696, 22.540133],

    name: "The MiXC",
    originalName: "罗湖万象城",
    rangeId: "citywide",
    categoryId: "shopping-mall",

    description: "A Luohu shopping mall.",

    author: "Rachel",
  },
  {
    location: [114.054007, 22.533569],

    name: "COCO Park",
    originalName: "COCO Park",
    rangeId: "citywide",
    categoryId: "shopping-mall",

    description: "A Futian shopping mall.",

    author: "Rachel",
  },
  {
    location: [113.935172, 22.517058],

    name: "Coastal City",
    originalName: "海岸城",
    rangeId: "citywide",
    categoryId: "shopping-mall",

    description: "A Nanshan shopping mall.",

    author: "Rachel",
  },
  {
    location: [114.314845, 22.597653],

    name: "Intercontinental Shenzhen Dameisha Resort",
    originalName: "大梅沙洲际酒店",
    rangeId: "nearby",
    categoryId: "hotel",

    coverImage: "/images/intercontinental-shenzhen-dameisha-resort/cover.jpeg",

    author: "Hao Du",
  },
  {
    location: [114.27579, 22.631594],

    name: "The Interlaken OCT Hotel",
    originalName: "东部华侨城茵特拉根酒店",
    rangeId: "nearby",
    categoryId: "hotel",

    coverImage: "/images/interlaken-oct-hotel/cover.jpeg",

    author: "Hao Du",
  },
  {
    location: [114.310454, 22.598002],

    name: "Shenzhen Dameisha Kingkey Palace Hotel",
    originalName: "深圳大梅沙京基海湾酒店",
    rangeId: "nearby",
    categoryId: "hotel",

    coverImage: "/images/kingkey-palace-hotel/cover.jpeg",

    author: "Hao Du",
  },
  {
    location: [114.30655, 22.593824],

    name: "Hilton Hampton",
    originalName: "喜来登欢朋酒店",
    rangeId: "nearby",
    categoryId: "hotel",

    coverImage: "/images/hilton-hampton/cover.png",

    author: "Hao Du",
  },
  {
    location: [114.30598, 22.59289],

    name: "Vienna International Hotel",
    originalName: "维也纳国际酒店",
    rangeId: "nearby",
    categoryId: "hotel",

    coverImage: "/images/vienna-international-hotel/cover.png",

    author: "Hao Du",
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

    author: "Hao Du",
  },
  {
    location: [114.30598, 22.59289],

    name: "Vienna Hotel",
    originalName: "维也纳酒店",
    rangeId: "nearby",
    categoryId: "hotel",

    coverImage: "/images/vienna-hotel/cover.png",

    author: "Hao Du",
  },
  {
    location: [114.303333, 22.603265],

    name: "Leyoujia.com",
    originalName: "乐有家",
    rangeId: "nearby",
    categoryId: "apartment-rental",

    coverImage: "/images/leyoujia/cover.png",

    author: "Hao Du",
  },
  {
    location: [114.305604, 22.601214],

    name: "Zhongyuan Real Estate",
    originalName: "中原地产",
    rangeId: "nearby",
    categoryId: "apartment-rental",

    coverImage: "/images/zhongyuan-real-estate/cover.png",

    author: "Hao Du",
  },
  {
    location: [114.313683, 22.599189],

    name: "PinAn Bank",
    originalName: "平安银行",
    rangeId: "nearby",
    categoryId: "bank",

    coverImage: "/images/pinan-bank/cover.png",

    author: "Hao Du",
  },
  {
    location: [114.307825, 22.594095],

    name: "CCB ATM",
    originalName: "建行自助取款机",
    rangeId: "nearby",
    categoryId: "atm",

    coverImage: "/images/ccb-atm/cover.png",

    author: "Hao Du",
  },
  {
    location: [114.311149, 22.599617],

    name: "Meisha Police Station",
    originalName: "梅沙派出所",
    rangeId: "nearby",
    categoryId: "police",

    coverImage: "/images/meisha-police-station/cover.png",

    author: "Hao Du",
  },
  {
    location: [114.305297, 22.59448],

    name: "XLCT Pharmacy Shop",
    originalName: "杏林大药房",
    rangeId: "nearby",
    categoryId: "pharmacy",

    coverImage: "/images/xlct-pharmacy-shop/cover.png",

    author: "Hao Du",
  },
];

export default places;
