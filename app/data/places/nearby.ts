import { type Place } from "~/routes/_app/types";

import { PointOfInterestType } from "../types";

const placesNearby: Place[] = [
  {
    location: [114.300844, 22.600616],
    name: "东海岸运动公园",
    translation: "Vanke East Coast Exercising Park",
    type: PointOfInterestType.Park,
    description:
      "Vanke East Coast Exercising Park is a park where you can walk, run, and relax. There are lots of lotus and trees; the park is usually quiet and the air feels fresh.",
    keywords: ["hiking"],
    author: "Oliver",
  },
  {
    location: [114.312739, 22.59973],
    name: "鹅公岌社区公园",
    translation: "Uphill Community Park",
    type: PointOfInterestType.Park,
    description:
      "There is a beautiful uphill trail surrounded by trees in this park where you can walk to the top of a hill. On the top, there is a nice lookout spot where you can look down at all the Dameisha.",
    keywords: ["hiking"],
    author: "Oliver",
  },
  {
    location: [114.324042, 22.595271],
    name: "小梅沙海滨栈道",
    translation: "Xiaomeisha Seashore Walkway",
    type: PointOfInterestType.Walkway,
    description:
      "This is a well-established walkway across Dameisha and Xiaomeisha with beautiful views of the sea. This walkway usually don’t have many people, so you can enjoy many beautiful sight seeing spots along the walk way with little disturbance!",
    keywords: ["hiking", "cycling"],
    author: "Oliver",
  },
  {
    location: [114.305176, 22.606662],
    name: "峡湾栈道",
    translation: "Fjord Walkway",
    type: PointOfInterestType.Walkway,
    description:
      "This is another long walkway in Dameisha where you can hike while enjoying beautiful sea views.",
    keywords: ["hiking"],
    author: "Oliver",
  },
  {
    location: [114.30482, 22.601422],
    name: "大梅沙海滨公园",
    translation: "Dameisha Seashore Park",
    type: PointOfInterestType.Park,
    description:
      "This is a park at the Dameisha beach enjoy the sea view and relax on the beach. Here, you can access a long walkway connected to the Xiaomeisha Seashore Walkway and other parts of the Dantean District.",
    keywords: ["hiking", "cycling"],
    author: "Oliver",
  },

  {
    location: [114.307954, 22.592429],
    name: "大梅沙",
    translation: "Dameisha Park",
    type: PointOfInterestType.Park,
    description:
      "Dameisha park is the biggest tourist attraction in the area. You can enjoy the beach and participate in numerous kinds of activities in the park, including water sports.",
    keywords: ["park"],
    author: "Oliver",
  },
  {
    location: [114.304365, 22.587607],
    name: "大梅沙海滨公园海滩水乐园",
    translation: "Dameisha Beach Waterpark",
    type: PointOfInterestType.AmusementPark,
    description:
      "This is a park built on the Dameisha beach for children to play on water. There are small waterslides.",
    keywords: ["park"],
    author: "Oliver",
  },
  {
    location: [114.309256, 22.597907],
    name: "内湖公园",
    translation: "Mid-lake Park",
    type: PointOfInterestType.Park,
    description:
      "This is the park beside the VMA campus, going across the Dameisha Outlets. You can enjoy the beautiful scenery of the late and relax under the sunlight. You can see black swans if you are lucky!",
    keywords: ["park"],
    author: "Oliver",
  },

  {
    location: [114.30482, 22.601422],
    name: "梅沙医院",
    translation: "Meisha Hospital",
    type: PointOfInterestType.HealthHospital,
    description:
      "This is the closest public hospital to the Dameisha community. It has complete services and equipments for a variety of treatments.",
    keywords: ["healthcare"],
    author: "Oliver",
  },
  {
    location: [114.305151, 22.595686],
    name: "南北药行",
    translation: "Naber Pharmacy",
    type: PointOfInterestType.HealthPharmacy,
    keywords: ["healthcare"],
    author: "Oliver",
  },
  {
    location: [114.305486, 22.600009],
    name: "中联大药房",
    translation: "China Associate Pharmacy",
    type: PointOfInterestType.HealthPharmacy,
    keywords: ["healthcare"],
    author: "Oliver",
  },
  {
    location: [114.31046, 22.599214],
    name: "万春堂",
    translation: "Wanchun Pharmacy",
    type: PointOfInterestType.HealthPharmacy,
    keywords: ["healthcare"],
    author: "Oliver",
  },

  {
    location: [114.305833, 22.595824],
    name: "良禽择木",
    translation: "Coconut Chicken",
    type: PointOfInterestType.FoodRestaurant,
    description:
      "This is a place where you can eat hotpot with coconut and chicken.",
    cover_image: "/images/coconut-chicken/cover.jpeg",
    signature_dishes: [
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
    keywords: ["food"],
    author: "Rachel",
  },
  {
    location: [114.30553, 22.593075],
    name: "兰州拉面",
    translation: "Lanzhou Noodles",
    type: PointOfInterestType.FoodRestaurant,
    description: "This is a place where you can eat halal food.",
    cover_image: "/images/lanzhou-noodles/cover.jpeg",
    signature_dishes: [
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
    keywords: ["food"],
    author: "Rachel",
  },
  {
    location: [114.308212, 22.594924],
    name: "麦当劳",
    translation: "Mcdonald’s",
    type: PointOfInterestType.FoodFast,
    cover_image: "/images/mcdonalds/cover.jpeg",
    keywords: ["food"],
    author: "Rachel",
  },
  {
    location: [114.308934, 22.596855],
    name: "必胜客",
    translation: "Pizza Hut",
    type: PointOfInterestType.FoodFast,
    cover_image: "/images/pizza-hut/cover.jpeg",
    keywords: ["food"],
    author: "Rachel",
  },
  {
    location: [114.308057, 22.597201],
    name: "汉堡王",
    translation: "Burger King",
    type: PointOfInterestType.FoodFast,
    cover_image: "/images/burger-king/cover.jpeg",
    keywords: ["food"],
    author: "Rachel",
  },
  {
    location: [114.305722, 22.593723],
    name: "五谷坊烤乳鸽",
    translation: "Wugufang Roast Pigeon",
    type: PointOfInterestType.FoodRestaurant,
    description:
      "This is a place where you can eat Guangdong traditional foods.",
    cover_image: "/images/wugufang-roast-pigeon/cover.jpeg",
    signature_dishes: [
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
    keywords: ["food"],
    author: "Rachel",
  },
  {
    location: [114.308338, 22.598859],
    name: "海边的寿司店",
    translation: "Seaside Sushi",
    type: PointOfInterestType.FoodRestaurant,
    cover_image: "/images/seaside-sushi/cover.jpeg",
    signature_dishes: [
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
    keywords: ["food"],
    author: "Rachel",
  },
  {
    location: [114.308527, 22.596445],
    name: "奈雪的茶",
    translation: "Nayuki",
    type: PointOfInterestType.FoodBeverage,
    description:
      "This is a place where you can drink milk teas and eat breads.",
    cover_image: "/images/nayuki/cover.jpeg",
    signature_dishes: [
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
    keywords: ["food"],
    author: "Rachel",
  },
  {
    location: [114.306352, 22.595529],
    name: "雅拉画廊咖啡",
    translation: "Yarra Café",
    type: PointOfInterestType.FoodBeverage,
    description:
      "The top ranked coffee shop in Dameisha.They offer bilingual menu!",
    signature_dishes: [
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
    name: "星巴克",
    translation: "Starbucks",
    type: PointOfInterestType.FoodBeverage,
    description: "There is also a Starbucks in Dameisha!",
    author: "Oliver",
  },
  {
    location: [114.308698, 22.594092],
    name: "研磨时光",
    translation: "Time",
    type: PointOfInterestType.FoodBeverage,
    description: "A shop that makes fresh fruit juice and coffee.",
    cover_image: "/images/time/cover.jpeg",
    signature_dishes: [
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
    name: "深圳大梅沙跳伞基地",
    translation: "Dameisha Skydiving Base",
    type: PointOfInterestType.Fitness,
    cover_image: "/images/dameisha-skydiving-base/cover.jpeg",
    author: "Oliver",
  },
  {
    location: [114.309633, 22.594766],
    name: "大梅沙游艇旅游服务中心",
    translation: "Dameisha Yacht Service Center",
    type: PointOfInterestType.Fitness,
    cover_image: "/images/dameisha-yacht-service-center/cover.jpeg",
    author: "Oliver",
  },
  {
    location: [114.312238, 22.598236],
    name: "大梅沙游艇帆船出租中心",
    translation: "Dameisha Yacht & Sailing Rental Center",
    type: PointOfInterestType.Fitness,
    cover_image: "/images/dameisha-yacht-sailing-rental-center/cover.jpeg",
    author: "Oliver",
  },
  {
    location: [114.311454, 22.597956],
    name: "逸景电动冲浪俱乐部",
    translation: "Yijing Surfing",
    type: PointOfInterestType.Fitness,
    description:
      "A club where you can experience electric surfing, motorboat, and snorkeling!",
    cover_image: "/images/yijing-surfing/cover.jpeg",
    author: "Oliver",
  },
];

export default placesNearby;
