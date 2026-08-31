import React, { useState } from 'react';
import heroPlumber from '../assets/images/hero_plumber_man_1787609936978.jpg';
import heroElectrician from '../assets/images/hero_electrician_man_1787609951146.jpg';
import heroCleaning from '../assets/images/hero_cleaning_man_1787609963288.jpg';
import heroAc from '../assets/images/hero_ac_man_1787609977922.jpg';
import heroCarpenter from '../assets/images/hero_carpenter_man_1787609994391.jpg';
import heroDelivery from '../assets/images/hero_delivery_man_1787610009038.jpg';
import heroRepair from '../assets/images/hero_repair_man_1787610023268.jpg';
import heroPainter from '../assets/images/hero_painter_man_1787610036982.jpg';
import heroBarber from '../assets/images/hero_barber_man_1787610051938.jpg';
import heroLocksmith from '../assets/images/hero_locksmith_man_1787610067412.jpg';
import heroMason from '../assets/images/hero_mason_man_1787610089924.jpg';
import heroWelder from '../assets/images/hero_welder_man_1787610105428.jpg';
import heroMechanic from '../assets/images/hero_mechanic_man_1787610120460.jpg';
import heroBeauty from '../assets/images/hero_beauty_pro_1787610136284.jpg';
import heroDriver from '../assets/images/hero_driver_man_1787610149265.jpg';
import {
  Wrench,
  Zap,
  Paintbrush,
  Hammer,
  Calculator,
  Snowflake,
  Sparkles,
  Car,
  Droplet,
  Waves,
  Tv,
  Package,
  Star,
  Smartphone,
  KeyRound,
  Scissors,
  Heart,
  Truck,
  ChefHat,
  Trees,
  Shirt,
  AlertTriangle,
  Flame,
  User,
  ShowerHead,
  BookOpen,
  Camera,
  Layers,
  Wind,
  LucideIcon
} from 'lucide-react';

export interface ServiceHumanActionVisual {
  image: string;
  fallbackImage: string;
  alt: string;
  name: string;
  nameHi: string;
  actionText: string;
  actionTextHi: string;
}

export const SERVICE_HUMAN_ACTION_VISUALS: Record<number, ServiceHumanActionVisual> = {
  // 1. Plumber
  1: {
    image: heroPlumber,
    fallbackImage: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&auto=format&fit=crop&q=85",
    alt: "Plumber actively repairing pipe leakage and water tap with wrench",
    name: "Plumber",
    nameHi: "प्लंबर",
    actionText: "Pipe & Tap Repair",
    actionTextHi: "पाइप व नल रिपेयर"
  },
  // 2. Electrician
  2: {
    image: heroElectrician,
    fallbackImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=85",
    alt: "Electrician working on electrical switchboard and circuit wiring",
    name: "Electrician",
    nameHi: "इलेक्ट्रीशियन",
    actionText: "Wiring & Switchboard",
    actionTextHi: "वायरिंग व स्विचबोर्ड"
  },
  // 3. Painter
  3: {
    image: heroPainter,
    fallbackImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=85",
    alt: "Painter painting room wall with fresh paint roller",
    name: "Painter",
    nameHi: "पेंटर",
    actionText: "Wall Painting & Putty",
    actionTextHi: "दीवार पुताई व पुट्टी"
  },
  // 4. Accountant
  4: {
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop&q=85",
    fallbackImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=85",
    alt: "Accountant filing taxes and doing bookkeeping on laptop",
    name: "Accountant",
    nameHi: "अकाउंटेंट",
    actionText: "GST & Tax Filing",
    actionTextHi: "GST व टैक्स फाइलिंग"
  },
  // 5. Carpenter
  5: {
    image: heroCarpenter,
    fallbackImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=85",
    alt: "Carpenter doing woodwork and furniture repair at workbench",
    name: "Carpenter",
    nameHi: "कारपेंटर",
    actionText: "Woodwork & Furniture",
    actionTextHi: "लकड़ी काम व फर्नीचर"
  },
  // 6. Home Cleaning
  6: {
    image: heroCleaning,
    fallbackImage: "https://images.unsplash.com/photo-1581578731522-a20478649934?w=600&auto=format&fit=crop&q=85",
    alt: "Professional cleaner cleaning home floor and surfaces with spray",
    name: "Cleaning",
    nameHi: "क्लीनिंग",
    actionText: "Deep Home Cleaning",
    actionTextHi: "घर की डीप क्लीनिंग"
  },
  // 7. AC Repair
  7: {
    image: heroAc,
    fallbackImage: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&auto=format&fit=crop&q=85",
    alt: "Technician repairing and servicing air conditioner unit",
    name: "AC Repair",
    nameHi: "AC रिपेयर",
    actionText: "AC Service & Gas",
    actionTextHi: "AC सर्विस व गैस"
  },
  // 9. Washing Machine
  9: {
    image: heroRepair,
    fallbackImage: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=600&auto=format&fit=crop&q=85",
    alt: "Technician repairing washing machine motor and drum",
    name: "Washing Machine",
    nameHi: "वाशिंग मशीन",
    actionText: "Washing Machine Fix",
    actionTextHi: "वाशिंग मशीन रिपेयर"
  },
  // 10. TV / Electronics Repair
  10: {
    image: heroRepair,
    fallbackImage: "https://images.unsplash.com/photo-1597740985671-2a8a3b80f017?w=600&auto=format&fit=crop&q=85",
    alt: "Technician repairing electronic circuits and LED TV display with tools",
    name: "TV & Electronics",
    nameHi: "TV व इलेक्ट्रॉनिक्स",
    actionText: "TV & Circuit Fix",
    actionTextHi: "TV व सर्किट रिपेयर"
  },
  // 11. Car Services
  11: {
    image: heroMechanic,
    fallbackImage: "https://images.unsplash.com/photo-1486006396193-471d6f58c6d8?w=600&auto=format&fit=crop&q=85",
    alt: "Car mechanic inspecting vehicle engine and repairs",
    name: "Car Service",
    nameHi: "कार सर्विस",
    actionText: "Car Repair & Wash",
    actionTextHi: "कार रिपेयर व वाश"
  },
  // 12. Bike Mechanic
  12: {
    image: heroMechanic,
    fallbackImage: "https://images.unsplash.com/photo-1486006396193-471d6f58c6d8?w=600&auto=format&fit=crop&q=85",
    alt: "Mechanic repairing motorcycle and bike engine at doorstep",
    name: "Bike Mechanic",
    nameHi: "बाइक मैकेनिक",
    actionText: "Bike & Scooter Service",
    actionTextHi: "बाइक व स्कूटी रिपेयर"
  },
  // 13. RO / Water Purifier
  13: {
    image: "https://images.unsplash.com/photo-1617155093730-a8bf47be7921?w=600&auto=format&fit=crop&q=85",
    fallbackImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=85",
    alt: "Technician installing and servicing RO water purifier filters",
    name: "Water Purifier",
    nameHi: "वाटर प्यूरीफायर",
    actionText: "RO Filter & Membrane",
    actionTextHi: "RO फिल्टर व मेम्ब्रेन"
  },
  // 14. Electrical Appliance
  14: {
    image: heroRepair,
    fallbackImage: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=85",
    alt: "Technician fixing home appliance with screwdriver",
    name: "Appliances",
    nameHi: "घरेलू उपकरण",
    actionText: "Microwave & Geyser",
    actionTextHi: "गीजर व मिक्सी रिपेयर"
  },
  // 15. Door Lock / Locksmith
  15: {
    image: heroLocksmith,
    fallbackImage: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=600&auto=format&fit=crop&q=85",
    alt: "Locksmith technician repairing door lock handle and keys",
    name: "Locksmith",
    nameHi: "ताला चाबी",
    actionText: "Lock & Key Making",
    actionTextHi: "ताला चाबी रिपेयर"
  },
  // 16. Delivery Partner
  16: {
    image: heroDelivery,
    fallbackImage: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600&auto=format&fit=crop&q=85",
    alt: "Delivery partner riding scooter with delivery parcel bag",
    name: "Delivery",
    nameHi: "डिलीवरी",
    actionText: "Fast Parcel Delivery",
    actionTextHi: "तत्काल पार्सल डिलीवरी"
  },
  // 201. Salon Men & Women
  201: {
    image: heroBarber,
    fallbackImage: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=85",
    alt: "Barber stylist with scissors and comb",
    name: "Salon",
    nameHi: "सैलून",
    actionText: "Haircut & Grooming",
    actionTextHi: "हेयरकट व ग्रूमिंग"
  },
  // 202. Beauty & Makeup
  202: {
    image: heroBeauty,
    fallbackImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&auto=format&fit=crop&q=85",
    alt: "Beauty specialist with makeup brush and palette",
    name: "Beauty",
    nameHi: "ब्यूटी",
    actionText: "Facial & Makeup",
    actionTextHi: "फेशियल व मेकअप"
  },
  // 301. Mason / Raj Mistri
  301: {
    image: heroMason,
    fallbackImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=85",
    alt: "Mason builder with trowel and brick",
    name: "Mason",
    nameHi: "राज मिस्त्री",
    actionText: "Brickwork & Plaster",
    actionTextHi: "चिनाई व प्लास्टर"
  },
  // 303. Welder
  303: {
    image: heroWelder,
    fallbackImage: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=85",
    alt: "Welder craftsman with welding torch and sparks",
    name: "Welder",
    nameHi: "वेल्डर",
    actionText: "Grill & Gate Welding",
    actionTextHi: "ग्रिल व गेट वेल्डिंग"
  },
  // 602. Ride & Taxi
  602: {
    image: heroDriver,
    fallbackImage: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&auto=format&fit=crop&q=85",
    alt: "Chauffeur cab driver at steering wheel",
    name: "Taxi & Driver",
    nameHi: "टैक्सी व ड्राइवर",
    actionText: "Cab & Auto Ride",
    actionTextHi: "कैब व ऑटो राइड"
  },

  // 1011. Geyser Repair
  1011: {
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80",
    alt: "Technician repairing geyser heating coil and thermostat",
    name: "Geyser Repair",
    nameHi: "गीजर रिपेयर",
    actionText: "Geyser Heating Fix",
    actionTextHi: "गीजर हीटिंग रिपेयर"
  },
  // 1021. Deep Cleaning
  1021: {
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1581578731522-a20478649934?w=600&auto=format&fit=crop&q=80",
    alt: "Cleaner performing intensive deep cleaning on floors with machine",
    name: "Deep Cleaning",
    nameHi: "डीप क्लीनिंग",
    actionText: "Intensive Sanitization",
    actionTextHi: "गहरी सैनिटाइजेशन"
  },
  // 1022. Bathroom Cleaning
  1022: {
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1581578731522-a20478649934?w=600&auto=format&fit=crop&q=80",
    alt: "Cleaner scrubbing bathroom tiles and removing stains",
    name: "Bathroom Cleaning",
    nameHi: "बाथरूम क्लीनिंग",
    actionText: "Tile Stain Removal",
    actionTextHi: "दाग व टाइल सफाई"
  },
  // 1023. Kitchen Cleaning
  1023: {
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1581578731522-a20478649934?w=600&auto=format&fit=crop&q=80",
    alt: "Cleaner degreasing kitchen chimney and countertop",
    name: "Kitchen Cleaning",
    nameHi: "किचन क्लीनिंग",
    actionText: "Oil & Grease Clean",
    actionTextHi: "चिकनाई व स्लैब सफाई"
  },
  // 1024. Sofa Cleaning
  1024: {
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1581578731522-a20478649934?w=600&auto=format&fit=crop&q=80",
    alt: "Professional shampooing fabric sofa with suction vacuum",
    name: "Sofa Cleaning",
    nameHi: "सोफा क्लीनिंग",
    actionText: "Sofa Shampoo Wash",
    actionTextHi: "सोफा शैम्पू वॉश"
  },
  // 1025. Carpet Cleaning
  1025: {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1581578731522-a20478649934?w=600&auto=format&fit=crop&q=80",
    alt: "Carpet deep foaming and vacuum wash",
    name: "Carpet Cleaning",
    nameHi: "कारपेट क्लीनिंग",
    actionText: "Carpet Foam Wash",
    actionTextHi: "कालीन फोम वॉश"
  },

  // 1031. AC Installation
  1031: {
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1599931661022-587c48796893?w=600&auto=format&fit=crop&q=80",
    alt: "Technician mounting split AC bracket on wall",
    name: "AC Installation",
    nameHi: "AC इंस्टालेशन",
    actionText: "Split AC Wall Mount",
    actionTextHi: "AC वॉल माउंट"
  },
  // 1032. Refrigerator Repair
  1032: {
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
    alt: "Technician checking refrigerator compressor and gas lines",
    name: "Refrigerator Repair",
    nameHi: "फ्रिज रिपेयर",
    actionText: "Fridge Cooling Fix",
    actionTextHi: "फ्रिज कूलिंग रिपेयर"
  },
  // 1033. Microwave Repair
  1033: {
    image: "https://images.unsplash.com/photo-1527383418406-f85a3b146499?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
    alt: "Technician servicing microwave magnetron and circuit",
    name: "Microwave Repair",
    nameHi: "माइक्रोवेव रिपेयर",
    actionText: "Magnetron & Panel",
    actionTextHi: "मैग्नेट्रॉन व पैनल"
  },

  // 1041. Furniture Repair
  1041: {
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80",
    alt: "Carpenter fixing dining chair and table joints",
    name: "Furniture Repair",
    nameHi: "फर्नीचर रिपेयर",
    actionText: "Chair & Bed Fix",
    actionTextHi: "कुर्सी व बेड रिपेयर"
  },
  // 1042. Furniture Assembly
  1042: {
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&auto=format&fit=crop&q=80",
    alt: "Carpenter assembling flatpack wooden wardrobe",
    name: "Furniture Assembly",
    nameHi: "फर्नीचर असेंबली",
    actionText: "Wardrobe & Bed Setup",
    actionTextHi: "अलमारी व बेड फिटिंग"
  },
  // 1043. Modular Furniture
  1043: {
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80",
    alt: "Carpenter setting up modular kitchen cabinets",
    name: "Modular Work",
    nameHi: "मॉड्यूलर वर्क",
    actionText: "Modular Kitchen",
    actionTextHi: "मॉड्यूलर किचन"
  },
  // 1044. Wood Polishing
  1044: {
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80",
    alt: "Polisher applying melamine gloss on teak wood door",
    name: "Wood Polish",
    nameHi: "वुड पॉलिश",
    actionText: "Melamine & PU Shine",
    actionTextHi: "मेलामाइन व चमक"
  },

  // 1051. Wall Painting
  1051: {
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&auto=format&fit=crop&q=80",
    alt: "Painter rolling smooth emulsion on wall",
    name: "Wall Painting",
    nameHi: "वॉल पेंटिंग",
    actionText: "Royale Emulsion",
    actionTextHi: "रॉयल इमल्शन"
  },
  // 1052. Waterproofing
  1052: {
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80",
    alt: "Waterproofing technician coating roof with sealant",
    name: "Waterproofing",
    nameHi: "वाटरप्रूफिंग",
    actionText: "Seepage & Damp Fix",
    actionTextHi: "सीलन व सीपेज सील"
  },
  // 1053. Tile & Flooring
  1053: {
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80",
    alt: "Tile mistri laying vitrified floor tiles with level tool",
    name: "Tile & Flooring",
    nameHi: "टाइल व फ्लोरिंग",
    actionText: "Vitrified Tile Fix",
    actionTextHi: "विट्रीफाइड टाइल फिटिंग"
  },
  // 1054. POP Work
  1054: {
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&auto=format&fit=crop&q=80",
    alt: "POP master plastering wall moulding and corners",
    name: "POP Work",
    nameHi: "POP वर्क",
    actionText: "Gypsum Punning",
    actionTextHi: "POP पुताई व मोल्डिंग"
  },
  // 1055. False Ceiling
  1055: {
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80",
    alt: "Gypsum false ceiling installation with cove lighting channel",
    name: "False Ceiling",
    nameHi: "फॉल्स सीलिंग",
    actionText: "Gypsum Cove Light",
    actionTextHi: "जिप्सम सीलिंग"
  },

  // 1061. Men Salon
  1061: {
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&auto=format&fit=crop&q=80",
    alt: "Barber giving professional haircut and beard styling in salon",
    name: "Men Salon",
    nameHi: "मेन सैलून",
    actionText: "Haircut & Beard Groom",
    actionTextHi: "हेयरकट व दाढ़ी सेट"
  },
  // 1062. Women Salon
  1062: {
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&auto=format&fit=crop&q=80",
    alt: "Beautician providing facial and hair styling in beauty salon",
    name: "Women Salon",
    nameHi: "वुमेन सैलून",
    actionText: "Facial & Hair Styling",
    actionTextHi: "फेशियल व स्टाइलिंग"
  },
  // 1063. Haircut & Styling
  1063: {
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop&q=80",
    alt: "Stylist cutting hair with precision scissors and comb",
    name: "Haircut & Styling",
    nameHi: "हेयरकट व स्टाइलिंग",
    actionText: "Fade & Layer Cut",
    actionTextHi: "लेयर व फेड कट"
  },
  // 1064. Hair Spa
  1064: {
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=80",
    alt: "Hair specialist performing steam hair spa and scalp massage",
    name: "Hair Spa",
    nameHi: "हेयर स्पा",
    actionText: "Deep Nourish Spa",
    actionTextHi: "डीप नरिश स्पा"
  },
  // 1065. Hair Treatment
  1065: {
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&auto=format&fit=crop&q=80",
    alt: "Stylist applying keratin smoothening treatment to hair",
    name: "Hair Treatment",
    nameHi: "हेयर ट्रीटमेंट",
    actionText: "Keratin & Smoothening",
    actionTextHi: "केराटिन व स्मूदनिंग"
  },
  // 1066. Beard & Shaving
  1066: {
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&auto=format&fit=crop&q=80",
    alt: "Barber shaving beard with precision straight razor",
    name: "Beard & Shave",
    nameHi: "दाढ़ी व शेविंग",
    actionText: "Razor Line & Trim",
    actionTextHi: "रेजर लाइन व शेव"
  },
  // 1067. Facial
  1067: {
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop&q=80",
    alt: "Beautician applying gold glow facial pack on client's face",
    name: "Facial",
    nameHi: "फेशियल",
    actionText: "Gold Glow Facial",
    actionTextHi: "गोल्ड ग्लो फेशियल"
  },
  // 1068. Manicure
  1068: {
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=80",
    alt: "Nail technician shaping nails and hand massage",
    name: "Manicure",
    nameHi: "मैनीक्योर",
    actionText: "Nail Care & Scrub",
    actionTextHi: "नेल केयर व स्क्रब"
  },
  // 1069. Pedicure
  1069: {
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop&q=80",
    alt: "Pedicurist treating feet with soothing warm water soak and scrub",
    name: "Pedicure",
    nameHi: "पेडीक्योर",
    actionText: "Foot Soak & Scrub",
    actionTextHi: "पैरों की स्क्रबिंग"
  },
  // 1070. Makeup
  1070: {
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop&q=80",
    alt: "Makeup artist applying eyeshadow and foundation with brushes",
    name: "Party Makeup",
    nameHi: "पार्टी मेकअप",
    actionText: "HD Makeup Look",
    actionTextHi: "HD पार्टी मेकअप"
  },
  // 1071. Bridal Makeup
  1071: {
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&auto=format&fit=crop&q=80",
    alt: "Makeup artist completing traditional Indian bridal makeover",
    name: "Bridal Makeup",
    nameHi: "ब्राइडल मेकअप",
    actionText: "Bridal Makeover",
    actionTextHi: "दुल्हन का मेकअप"
  },
  // 1072. Mehndi
  1072: {
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop&q=80",
    alt: "Mehndi artist applying intricate Arabic henna design on hands",
    name: "Mehndi Artist",
    nameHi: "मेहंदी आर्टिस्ट",
    actionText: "Bridal Henna Art",
    actionTextHi: "ब्राइडल मेहंदी"
  },

  // 1073. Women Spa
  1073: {
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&auto=format&fit=crop&q=80",
    alt: "Spa therapist giving relaxation massage at home",
    name: "Women Spa",
    nameHi: "वुमेन स्पा",
    actionText: "Aroma Body Spa",
    actionTextHi: "अरोमा बॉडी स्पा"
  },
  // 1074. Body Spa
  1074: {
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=80",
    alt: "Massage therapist performing deep tissue Swedish massage",
    name: "Body Spa",
    nameHi: "बॉडी स्पा",
    actionText: "Swedish Relaxation",
    actionTextHi: "स्वीडिश मसाज"
  },
  // 1075. Head Massage
  1075: {
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80",
    alt: "Therapist doing herbal oil head champi massage",
    name: "Head Massage",
    nameHi: "हेड मसाज (चंपी)",
    actionText: "Herbal Oil Champi",
    actionTextHi: "हर्बल तेल चंपी"
  },
  // 1076. Foot Massage
  1076: {
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&auto=format&fit=crop&q=80",
    alt: "Reflexology specialist applying pressure to foot acupoints",
    name: "Foot Massage",
    nameHi: "फुट मसाज",
    actionText: "Reflexology Relief",
    actionTextHi: "पैर दर्द निवारण"
  },
  // 1077. Wellness Massage
  1077: {
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=80",
    alt: "Therapeutic massage for back and joint pain relief",
    name: "Wellness Massage",
    nameHi: "वेलनेस मसाज",
    actionText: "Back Pain Therapy",
    actionTextHi: "कमर दर्द थेरेपी"
  },

  // 1081. Car Mechanic
  1081: {
    image: "https://images.unsplash.com/photo-1486006396193-471d6f58c6d8?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&auto=format&fit=crop&q=80",
    alt: "Car mechanic checking engine bay with diagnostic tools",
    name: "Car Mechanic",
    nameHi: "कार मैकेनिक",
    actionText: "Engine Diagnostics",
    actionTextHi: "इंजन जांच व रिपेयर"
  },
  // 1082. Car Washing
  1082: {
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1486006396193-471d6f58c6d8?w=600&auto=format&fit=crop&q=80",
    alt: "Pressure washer operator spraying snow foam on car",
    name: "Car Washing",
    nameHi: "कार वाशिंग",
    actionText: "Doorstep Foam Wash",
    actionTextHi: "प्रेशर फोम वॉश"
  },
  // 1083. Bike Washing
  1083: {
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1486006396193-471d6f58c6d8?w=600&auto=format&fit=crop&q=80",
    alt: "Worker jet washing motorcycle chain and body",
    name: "Bike Washing",
    nameHi: "बाइक वाशिंग",
    actionText: "Jet Foam & Chain Lube",
    actionTextHi: "जेट फोम व चेन ल्यूब"
  },
  // 1084. Puncture Repair
  1084: {
    image: "https://images.unsplash.com/photo-1486006396193-471d6f58c6d8?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&auto=format&fit=crop&q=80",
    alt: "Technician plugging tubeless tyre puncture on the road",
    name: "Puncture Fix",
    nameHi: "पंचर रिपेयर",
    actionText: "Doorstep Tubeless Patch",
    actionTextHi: "ट्यूबलेस पंचर लगाना"
  },
  // 1085. Battery / Jump Start
  1085: {
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1486006396193-471d6f58c6d8?w=600&auto=format&fit=crop&q=80",
    alt: "Technician attaching jumper cables to car battery terminal",
    name: "Jump Start",
    nameHi: "जंप स्टार्ट",
    actionText: "Instant Jump Start",
    actionTextHi: "तत्काल बैटरी स्टार्ट"
  },

  // 1091. Local Delivery
  1091: {
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=600&auto=format&fit=crop&q=80",
    alt: "Courier rider delivering urgent parcel to customer",
    name: "Local Delivery",
    nameHi: "लोकल डिलीवरी",
    actionText: "Neighborhood Drop",
    actionTextHi: "लोकल पार्सल ड्रॉप"
  },
  // 1092. Packers & Movers
  1092: {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&auto=format&fit=crop&q=80",
    alt: "Packers wrapping furniture in protective foam sheets",
    name: "Packers & Movers",
    nameHi: "पैकर्स एंड मूवर्स",
    actionText: "Safe Home Relocation",
    actionTextHi: "सुरक्षित सामान शिफ्टिंग"
  },
  // 1093. House Shifting
  1093: {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600&auto=format&fit=crop&q=80",
    alt: "Movers transporting household goods securely",
    name: "House Shifting",
    nameHi: "हाउस शिफ्टिंग",
    actionText: "Local Home Shifting",
    actionTextHi: "घर का सामान शिफ्टिंग"
  },
  // 1094. Loading / Unloading
  1094: {
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80",
    alt: "Helpers loading heavy boxes onto tempo truck",
    name: "Loading Helper",
    nameHi: "लोडिंग हेल्पर",
    actionText: "Heavy Lifting Helper",
    actionTextHi: "भारी सामान लोडिंग"
  },

  // 1101. Cook
  1101: {
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&auto=format&fit=crop&q=80",
    alt: "Chef cooking fresh hot meals in modern kitchen",
    name: "Cook",
    nameHi: "कुक / रसोइया",
    actionText: "Fresh Home Meals",
    actionTextHi: "स्वादिष्ट घरेलू खाना"
  },
  // 1102. Maid
  1102: {
    image: "https://images.unsplash.com/photo-1581578731522-a20478649934?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&auto=format&fit=crop&q=80",
    alt: "Domestic helper cleaning utensils and kitchen surfaces",
    name: "Maid / Domestic",
    nameHi: "घरेलू सहायिका",
    actionText: "Daily Household Help",
    actionTextHi: "दैनिक झाड़ू-बर्तन"
  },
  // 1103. Babysitting
  1103: {
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop&q=80",
    alt: "Caring babysitter taking care of child with toys",
    name: "Babysitting",
    nameHi: "बेबीसिटिंग",
    actionText: "Toddler & Child Care",
    actionTextHi: "बच्चों की देखभाल"
  },
  // 1104. Elder Care
  1104: {
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&auto=format&fit=crop&q=80",
    alt: "Compassionate attendant assisting elder person",
    name: "Elder Care",
    nameHi: "बुजुर्गों की देखभाल",
    actionText: "Elder Support & Care",
    actionTextHi: "बुजुर्गों की सेवा"
  },
  // 1105. Household Helper
  1105: {
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1581578731522-a20478649934?w=600&auto=format&fit=crop&q=80",
    alt: "Helper carrying market grocery bags and assisting home",
    name: "Home Helper",
    nameHi: "घरेलू हेल्पर",
    actionText: "Errands & Odd Jobs",
    actionTextHi: "बाजार काम व सहायता"
  },

  // 1111. Welder / Welding
  1111: {
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1508873696983-2df5293cb32b?w=600&auto=format&fit=crop&q=80",
    alt: "Welder with helmet actively welding iron gate with bright sparks",
    name: "Welder",
    nameHi: "वेल्डर",
    actionText: "Iron Gate & Grill Weld",
    actionTextHi: "लोहा गेट व ग्रिल वेल्डिंग"
  },
  // 1112. Fabricator
  1112: {
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1508873696983-2df5293cb32b?w=600&auto=format&fit=crop&q=80",
    alt: "Metal fabricator structuring steel frame and tin shed",
    name: "Fabricator",
    nameHi: "फैब्रिकेटर",
    actionText: "Steel Shed & Frame",
    actionTextHi: "टीन शेड व स्ट्रक्चर"
  },
  // 1113. Mason / Raj Mistri
  1113: {
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80",
    alt: "Mason laying red bricks with cement mortar and trowel",
    name: "Raj Mistri",
    nameHi: "राज मिस्त्री",
    actionText: "Brickwork & Plaster",
    actionTextHi: "ईंट चुनाई व प्लास्टर"
  },
  // 1114. Aluminium & Glass Work
  1114: {
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80",
    alt: "Worker assembling aluminium sliding glass windows",
    name: "Aluminium Work",
    nameHi: "एल्युमिनियम वर्क",
    actionText: "Sliding Glass Window",
    actionTextHi: "स्लाइडिंग खिड़की व शीशा"
  },
  // 1115. Iron Gate / Grill Work
  1115: {
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1508873696983-2df5293cb32b?w=600&auto=format&fit=crop&q=80",
    alt: "Fabricator repairing heavy iron main gate channel",
    name: "Iron Gate Work",
    nameHi: "लोहा गेट वर्क",
    actionText: "Gate & Railing Fix",
    actionTextHi: "गेट व रेलिंग रिपेयर"
  },
  // 1116. Construction Helper
  1116: {
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&auto=format&fit=crop&q=80",
    alt: "Construction helper mixing cement and carrying bricks",
    name: "Labor / Helper",
    nameHi: "कंस्ट्रक्शन लेबर",
    actionText: "Mortar & Bricks Labor",
    actionTextHi: "मसाला व ईंट लेबर"
  },

  // 1121. Computer Repair
  1121: {
    image: "https://images.unsplash.com/photo-1597740985671-2a8a3b80f017?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop&q=80",
    alt: "Technician upgrading laptop RAM and installing Windows",
    name: "Computer Repair",
    nameHi: "कंप्यूटर रिपेयर",
    actionText: "Windows & SSD Upgrade",
    actionTextHi: "विंडोज व SSD अपग्रेड"
  },
  // 1122. Mobile Repair
  1122: {
    image: "https://images.unsplash.com/photo-1597740985671-2a8a3b80f017?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
    alt: "Technician fixing mobile phone screen and charging jack",
    name: "Mobile Repair",
    nameHi: "मोबाइल रिपेयर",
    actionText: "Screen & Jack Fix",
    actionTextHi: "स्क्रीन व चार्जिंग जैक"
  },
  // 1123. Photographer
  1123: {
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80",
    alt: "Photographer shooting birthday function with DSLR camera",
    name: "Photographer",
    nameHi: "फोटोग्राफर",
    actionText: "Event & Birthday Shoot",
    actionTextHi: "फंक्शन फोटो शूट"
  },
  // 1124. Tutor
  1124: {
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80",
    alt: "Home tutor teaching math and science concepts to student",
    name: "Home Tutor",
    nameHi: "होम ट्यूटर",
    actionText: "Math & Science Tuition",
    actionTextHi: "गणित व विज्ञान ट्यूशन"
  },
  // 1125. Legal / Documentation
  1125: {
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80",
    alt: "Document specialist preparing rent agreement and affidavit",
    name: "Legal Docs",
    nameHi: "दस्तावेज सेवा",
    actionText: "Rent Agreement & Notary",
    actionTextHi: "रेंट एग्रीमेंट व नोटरी"
  },

  // 1131. Gardener
  1131: {
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6ef23d8c?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop&q=80",
    alt: "Gardener pruning flowering plants and trimming garden lawn",
    name: "Gardener",
    nameHi: "माली (Gardener)",
    actionText: "Plant Care & Trimming",
    actionTextHi: "पौधों की कटाई व खाद"
  },
  // 1132. Lawn Maintenance
  1132: {
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6ef23d8c?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop&q=80",
    alt: "Gardener mowing grass lawn with rotary mower machine",
    name: "Lawn Care",
    nameHi: "लॉन केयर",
    actionText: "Lawn Mowing & Weed Fix",
    actionTextHi: "घास कटाई व रखरखाव"
  },
  // 1133. Plant Care
  1133: {
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6ef23d8c?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop&q=80",
    alt: "Plant expert adding organic vermicompost to indoor planters",
    name: "Plant Care",
    nameHi: "पौधों की देखभाल",
    actionText: "Potting & Organic Soil",
    actionTextHi: "गमले बदलना व खाद"
  },
  // 1134. Outdoor Cleaning
  1134: {
    image: "https://images.unsplash.com/photo-1581578731522-a20478649934?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&auto=format&fit=crop&q=80",
    alt: "Worker pressure washing terrace floor and parking driveway",
    name: "Terrace Wash",
    nameHi: "छत धुलाई",
    actionText: "Pressure Jet Terrace Clean",
    actionTextHi: "छत व पार्किंग धुलाई"
  },

  // 1141. Laundry
  1141: {
    image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=600&auto=format&fit=crop&q=80",
    alt: "Laundry worker folding fresh crisp clean clothes",
    name: "Laundry",
    nameHi: "लॉन्ड्री",
    actionText: "Wash & Fold per Kg",
    actionTextHi: "कपड़े धुलाई व फोल्ड"
  },
  // 1142. Ironing
  1142: {
    image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=600&auto=format&fit=crop&q=80",
    alt: "Steam press master pressing crisp shirts on ironing table",
    name: "Steam Press",
    nameHi: "इस्त्री (Press)",
    actionText: "Heavy Steam Ironing",
    actionTextHi: "शर्ट व साड़ी स्टीम प्रेस"
  },
  // 1143. Dry Cleaning
  1143: {
    image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=600&auto=format&fit=crop&q=80",
    alt: "Dry cleaner steaming woolen blazer and bridal lehenga",
    name: "Dry Cleaning",
    nameHi: "ड्राई क्लीनिंग",
    actionText: "Suit & Lehenga Dryclean",
    actionTextHi: "सूट व लहंगा ड्राईक्लीन"
  },
  // 1144. Shoe Cleaning
  1144: {
    image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=600&auto=format&fit=crop&q=80",
    alt: "Shoe spa master scrubbing sneakers and polishing leather shoes",
    name: "Shoe Spa",
    nameHi: "शू स्पा",
    actionText: "Sneaker Wash & Polish",
    actionTextHi: "स्नीकर्स धुलाई व पॉलिश"
  },

  // 1151. Emergency Plumber
  1151: {
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&auto=format&fit=crop&q=80",
    alt: "Emergency plumber sealing bursting pipe leak with wrench",
    name: "Emergency Plumber",
    nameHi: "इमरजेंसी प्लंबर",
    actionText: "Urgent 15-Min Pipe Seal",
    actionTextHi: "15-मिनट पाइप लीकेज सील"
  },
  // 1152. Emergency Electrician
  1152: {
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80",
    alt: "Emergency electrician fixing spark short circuit on main breaker",
    name: "Emergency Electrician",
    nameHi: "इमरजेंसी इलेक्ट्रीशियन",
    actionText: "Short Circuit & MCB Fix",
    actionTextHi: "शॉर्ट सर्किट व MCB रिपेयर"
  },
  // 1153. Emergency Locksmith
  1153: {
    image: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
    alt: "Locksmith urgently unlocking locked door with tools",
    name: "Emergency Locksmith",
    nameHi: "इमरजेंसी लॉकस्मिथ",
    actionText: "Door Lock Out Opening",
    actionTextHi: "बंद दरवाजा तुरंत खोलना"
  },
  // 1154. Emergency AC Repair
  1154: {
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1599931661022-587c48796893?w=600&auto=format&fit=crop&q=80",
    alt: "Emergency technician fixing dead AC capacitor in extreme heat",
    name: "Emergency AC",
    nameHi: "इमरजेंसी AC",
    actionText: "Instant AC Cooling Restore",
    actionTextHi: "तत्काल AC कूलिंग रिपेयर"
  },
  // 1155. Emergency Appliance
  1155: {
    image: "https://images.unsplash.com/photo-1527383418406-f85a3b146499?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
    alt: "Technician urgently restoring refrigerator cooling",
    name: "Emergency Appliance",
    nameHi: "इमरजेंसी उपकरण",
    actionText: "Urgent Fridge & Machine Fix",
    actionTextHi: "तत्काल उपकरण रिपेयर"
  },

  // Main Category Visuals (101 - 115)
  101: {
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&auto=format&fit=crop&q=80",
    alt: "Repair and electrical work with technician tools",
    name: "Repair & Electrical",
    nameHi: "रिपेयर और इलेक्ट्रिकल",
    actionText: "Plumbing & Electrical",
    actionTextHi: "प्लंबिंग व बिजली काम"
  },
  102: {
    image: "https://images.unsplash.com/photo-1581578731522-a20478649934?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&auto=format&fit=crop&q=80",
    alt: "Home deep cleaning service with professional equipment",
    name: "Home Cleaning",
    nameHi: "होम क्लीनिंग",
    actionText: "Full Home Sanitization",
    actionTextHi: "घर की पूरी सफाई"
  },
  103: {
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&auto=format&fit=crop&q=80",
    alt: "AC and appliance repair technician servicing unit",
    name: "AC & Appliances",
    nameHi: "AC व उपकरण",
    actionText: "AC & Refrigerator Fix",
    actionTextHi: "AC व फ्रिज सर्विस"
  },
  104: {
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&auto=format&fit=crop&q=80",
    alt: "Carpenter woodworking and furniture fabrication",
    name: "Carpenter & Furniture",
    nameHi: "कारपेंटर व फर्नीचर",
    actionText: "Woodwork & Furniture",
    actionTextHi: "लकड़ी काम व फर्नीचर"
  },
  105: {
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&auto=format&fit=crop&q=80",
    alt: "Wall painting and waterproofing renovation service",
    name: "Painting & Renovation",
    nameHi: "पेंटिंग व नवीनीकरण",
    actionText: "Paint & Waterproofing",
    actionTextHi: "पुताई व सीलन सील"
  },
  106: {
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80",
    alt: "Salon and beauty stylist providing grooming services",
    name: "Salon & Beauty",
    nameHi: "सैलून व ब्यूटी",
    actionText: "Haircut, Facial & Makeup",
    actionTextHi: "हेयरकट, फेशियल व मेकअप"
  },
  107: {
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&auto=format&fit=crop&q=80",
    alt: "Spa therapist giving relaxing head and body massage",
    name: "Spa & Wellness",
    nameHi: "स्पा व वेलनेस",
    actionText: "Body Spa & Head Massage",
    actionTextHi: "बॉडी स्पा व हेड मसाज"
  },
  108: {
    image: "https://images.unsplash.com/photo-1486006396193-471d6f58c6d8?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&auto=format&fit=crop&q=80",
    alt: "Vehicle mechanic repairing bike and car",
    name: "Vehicle Services",
    nameHi: "वाहन सेवाएं",
    actionText: "Bike & Car Repair & Wash",
    actionTextHi: "बाइक, कार रिपेयर व धुलाई"
  },
  109: {
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
    alt: "Delivery partner delivering parcel and moving boxes",
    name: "Delivery & Moving",
    nameHi: "डिलीवरी व शिफ्टिंग",
    actionText: "Parcel & Home Shifting",
    actionTextHi: "पार्सल व घर शिफ्टिंग"
  },
  110: {
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1581578731522-a20478649934?w=600&auto=format&fit=crop&q=80",
    alt: "Cook and domestic maid helping with household tasks",
    name: "Cook & Domestic Help",
    nameHi: "कुक व घरेलू सहायक",
    actionText: "Home Food & Daily Maid",
    actionTextHi: "घरेलू खाना व बाई सेवा"
  },
  111: {
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80",
    alt: "Welder and mason doing construction and fabrication work",
    name: "Construction & Fabrication",
    nameHi: "निर्माण व वेल्डिंग",
    actionText: "Welder, Mason & Grill",
    actionTextHi: "वेल्डर, मिस्त्री व ग्रिल"
  },
  112: {
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1597740985671-2a8a3b80f017?w=600&auto=format&fit=crop&q=80",
    alt: "Professional accountant and tech specialist at work",
    name: "Professional Services",
    nameHi: "प्रोफेशनल सेवाएं",
    actionText: "Tax, Laptop & Photo",
    actionTextHi: "टैक्स, लैपटॉप व फोटो"
  },
  113: {
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6ef23d8c?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop&q=80",
    alt: "Gardener caring for plants and lawn maintenance",
    name: "Outdoor & Garden",
    nameHi: "गार्डन व आउटडोर",
    actionText: "Gardener & Plant Care",
    actionTextHi: "माली व पौधों की देखभाल"
  },
  114: {
    image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=600&auto=format&fit=crop&q=80",
    alt: "Laundry and ironing pressing service",
    name: "Laundry & Care",
    nameHi: "लॉन्ड्री व कपड़े",
    actionText: "Wash, Steam Iron & Dryclean",
    actionTextHi: "धुलाई, प्रेस व ड्राईक्लीन"
  },
  115: {
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&auto=format&fit=crop&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80",
    alt: "Emergency rapid response service technician with toolkit",
    name: "Emergency Services",
    nameHi: "इमरजेंसी सेवाएं",
    actionText: "15-Min Urgent Dispatch",
    actionTextHi: "15-मिनट तत्काल मदद"
  }
};

export const getCategoryIconInfo = (categoryId: number): {
  Icon: LucideIcon;
  emoji: string;
  bgGradient: string;
  iconColor: string;
  badgeBg: string;
  softBg: string;
  borderColor: string;
  ringColor: string;
} => {
  switch (categoryId) {
    case 1:
    case 1151:
      return {
        Icon: Wrench,
        emoji: '🔧',
        bgGradient: 'from-blue-500 to-cyan-600',
        iconColor: 'text-blue-600',
        badgeBg: 'bg-blue-50 text-blue-600 border-blue-200',
        softBg: 'bg-blue-50',
        borderColor: 'border-blue-200',
        ringColor: 'ring-blue-400/30'
      };
    case 2:
    case 1152:
      return {
        Icon: Zap,
        emoji: '⚡',
        bgGradient: 'from-amber-400 to-amber-600',
        iconColor: 'text-amber-600',
        badgeBg: 'bg-amber-50 text-amber-600 border-amber-200',
        softBg: 'bg-amber-50',
        borderColor: 'border-amber-200',
        ringColor: 'ring-amber-400/30'
      };
    case 3:
    case 1051:
      return {
        Icon: Paintbrush,
        emoji: '🎨',
        bgGradient: 'from-pink-500 to-rose-600',
        iconColor: 'text-pink-600',
        badgeBg: 'bg-pink-50 text-pink-600 border-pink-200',
        softBg: 'bg-pink-50',
        borderColor: 'border-pink-200',
        ringColor: 'ring-pink-400/30'
      };
    case 4:
      return {
        Icon: Calculator,
        emoji: '📊',
        bgGradient: 'from-emerald-500 to-teal-700',
        iconColor: 'text-emerald-700',
        badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        softBg: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        ringColor: 'ring-emerald-400/30'
      };
    case 5:
    case 1041:
    case 1042:
    case 1043:
    case 1044:
      return {
        Icon: Hammer,
        emoji: '🪚',
        bgGradient: 'from-amber-600 to-orange-700',
        iconColor: 'text-amber-800',
        badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
        softBg: 'bg-amber-50',
        borderColor: 'border-amber-200',
        ringColor: 'ring-amber-400/30'
      };
    case 6:
    case 1021:
    case 1022:
    case 1023:
    case 1024:
    case 1025:
      return {
        Icon: Sparkles,
        emoji: '🧹',
        bgGradient: 'from-emerald-400 to-green-600',
        iconColor: 'text-emerald-600',
        badgeBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
        softBg: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        ringColor: 'ring-emerald-400/30'
      };
    case 7:
    case 1031:
    case 1032:
    case 1154:
      return {
        Icon: Snowflake,
        emoji: '❄️',
        bgGradient: 'from-sky-400 to-blue-600',
        iconColor: 'text-sky-600',
        badgeBg: 'bg-sky-50 text-sky-600 border-sky-200',
        softBg: 'bg-sky-50',
        borderColor: 'border-sky-200',
        ringColor: 'ring-sky-400/30'
      };
    case 9:
    case 1141:
      return {
        Icon: Waves,
        emoji: '🧺',
        bgGradient: 'from-indigo-500 to-blue-600',
        iconColor: 'text-indigo-600',
        badgeBg: 'bg-indigo-50 text-indigo-600 border-indigo-200',
        softBg: 'bg-indigo-50',
        borderColor: 'border-indigo-200',
        ringColor: 'ring-indigo-400/30'
      };
    case 10:
    case 1121:
    case 1122:
      return {
        Icon: Smartphone,
        emoji: '📱',
        bgGradient: 'from-purple-500 to-indigo-600',
        iconColor: 'text-purple-600',
        badgeBg: 'bg-purple-50 text-purple-600 border-purple-200',
        softBg: 'bg-purple-50',
        borderColor: 'border-purple-200',
        ringColor: 'ring-purple-400/30'
      };
    case 12:
    case 1081:
    case 1082:
    case 1083:
    case 1084:
    case 1085:
      return {
        Icon: Car,
        emoji: '🚗',
        bgGradient: 'from-red-500 to-rose-600',
        iconColor: 'text-red-600',
        badgeBg: 'bg-red-50 text-red-600 border-red-200',
        softBg: 'bg-red-50',
        borderColor: 'border-red-200',
        ringColor: 'ring-red-400/30'
      };
    case 13:
      return {
        Icon: Droplet,
        emoji: '💧',
        bgGradient: 'from-cyan-400 to-teal-600',
        iconColor: 'text-cyan-600',
        badgeBg: 'bg-cyan-50 text-cyan-600 border-cyan-200',
        softBg: 'bg-cyan-50',
        borderColor: 'border-cyan-200',
        ringColor: 'ring-cyan-400/30'
      };
    case 14:
    case 1033:
    case 1155:
      return {
        Icon: Tv,
        emoji: '🔌',
        bgGradient: 'from-teal-500 to-cyan-700',
        iconColor: 'text-teal-600',
        badgeBg: 'bg-teal-50 text-teal-600 border-teal-200',
        softBg: 'bg-teal-50',
        borderColor: 'border-teal-200',
        ringColor: 'ring-teal-400/30'
      };
    case 15:
    case 1153:
      return {
        Icon: KeyRound,
        emoji: '🔑',
        bgGradient: 'from-amber-400 to-orange-500',
        iconColor: 'text-amber-600',
        badgeBg: 'bg-amber-50 text-amber-600 border-amber-200',
        softBg: 'bg-amber-50',
        borderColor: 'border-amber-200',
        ringColor: 'ring-amber-400/30'
      };
    case 16:
    case 1091:
    case 1092:
    case 1093:
    case 1094:
      return {
        Icon: Package,
        emoji: '🛵',
        bgGradient: 'from-orange-500 to-amber-600',
        iconColor: 'text-orange-600',
        badgeBg: 'bg-orange-50 text-orange-600 border-orange-200',
        softBg: 'bg-orange-50',
        borderColor: 'border-orange-200',
        ringColor: 'ring-orange-400/30'
      };
    case 1061:
    case 1063:
    case 1066:
      return {
        Icon: Scissors,
        emoji: '💈',
        bgGradient: 'from-sky-500 to-indigo-600',
        iconColor: 'text-sky-600',
        badgeBg: 'bg-sky-50 text-sky-600 border-sky-200',
        softBg: 'bg-sky-50',
        borderColor: 'border-sky-200',
        ringColor: 'ring-sky-400/30'
      };
    case 1062:
    case 1064:
    case 1065:
    case 1067:
    case 1068:
    case 1069:
    case 1070:
    case 1071:
    case 1072:
      return {
        Icon: Sparkles,
        emoji: '💇',
        bgGradient: 'from-pink-500 to-fuchsia-600',
        iconColor: 'text-pink-600',
        badgeBg: 'bg-pink-50 text-pink-600 border-pink-200',
        softBg: 'bg-pink-50',
        borderColor: 'border-pink-200',
        ringColor: 'ring-pink-400/30'
      };
    case 1073:
    case 1074:
    case 1075:
    case 1076:
    case 1077:
      return {
        Icon: Heart,
        emoji: '💆',
        bgGradient: 'from-teal-500 to-emerald-600',
        iconColor: 'text-teal-600',
        badgeBg: 'bg-teal-50 text-teal-600 border-teal-200',
        softBg: 'bg-teal-50',
        borderColor: 'border-teal-200',
        ringColor: 'ring-teal-400/30'
      };
    case 1101:
    case 1102:
    case 1103:
    case 1104:
    case 1105:
      return {
        Icon: ChefHat,
        emoji: '👨‍🍳',
        bgGradient: 'from-orange-500 to-amber-600',
        iconColor: 'text-orange-600',
        badgeBg: 'bg-orange-50 text-orange-600 border-orange-200',
        softBg: 'bg-orange-50',
        borderColor: 'border-orange-200',
        ringColor: 'ring-orange-400/30'
      };
    case 1111:
    case 1112:
    case 1113:
    case 1114:
    case 1115:
    case 1116:
      return {
        Icon: Flame,
        emoji: '🔥',
        bgGradient: 'from-amber-600 to-zinc-800',
        iconColor: 'text-amber-600',
        badgeBg: 'bg-amber-50 text-amber-600 border-amber-200',
        softBg: 'bg-amber-50',
        borderColor: 'border-amber-200',
        ringColor: 'ring-amber-400/30'
      };
    case 1131:
    case 1132:
    case 1133:
    case 1134:
      return {
        Icon: Trees,
        emoji: '🌿',
        bgGradient: 'from-emerald-500 to-green-700',
        iconColor: 'text-emerald-700',
        badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        softBg: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        ringColor: 'ring-emerald-400/30'
      };
    case 1142:
    case 1143:
    case 1144:
      return {
        Icon: Shirt,
        emoji: '👔',
        bgGradient: 'from-sky-500 to-blue-600',
        iconColor: 'text-sky-600',
        badgeBg: 'bg-sky-50 text-sky-600 border-sky-200',
        softBg: 'bg-sky-50',
        borderColor: 'border-sky-200',
        ringColor: 'ring-sky-400/30'
      };
    default:
      return {
        Icon: Star,
        emoji: '⭐',
        bgGradient: 'from-amber-400 to-orange-500',
        iconColor: 'text-amber-600',
        badgeBg: 'bg-amber-50 text-amber-600 border-amber-200',
        softBg: 'bg-amber-50',
        borderColor: 'border-amber-200',
        ringColor: 'ring-amber-400/30'
      };
  }
};

interface ServiceIconProps {
  categoryId: number;
  className?: string;
  size?: number;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({ 
  categoryId, 
  className = '', 
  size = 18 
}) => {
  const { Icon, iconColor } = getCategoryIconInfo(categoryId);
  return <Icon size={size} className={`${iconColor} ${className}`} strokeWidth={2.2} />;
};

interface ServiceIconBoxProps {
  categoryId: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isSelected?: boolean;
  className?: string;
}

/**
 * Realistic Professional Human-Action Service Visual Box
 * Clean full-bleed, edge-to-edge single photo showing the real human working.
 * No nested circular thumbnails or secondary mini icons.
 */
export const ServiceIconBox: React.FC<ServiceIconBoxProps> = ({
  categoryId,
  size = 'md',
  isSelected = false,
  className = ''
}) => {
  const [hasError, setHasError] = useState(false);
  const visualInfo = SERVICE_HUMAN_ACTION_VISUALS[categoryId] || SERVICE_HUMAN_ACTION_VISUALS[1];

  const sizeClasses = {
    sm: 'w-10 h-10 rounded-xl',
    md: 'w-full h-full rounded-2xl',
    lg: 'w-16 h-16 rounded-2xl',
    xl: 'w-20 h-20 rounded-3xl'
  }[size];

  return (
    <div
      className={`relative overflow-hidden bg-slate-100 ${sizeClasses} flex items-center justify-center shrink-0 border transition-all duration-200 shadow-2xs p-0 ${
        isSelected
          ? 'border-amber-500 ring-2 ring-amber-400/50 shadow-xs'
          : 'border-slate-200/90 group-hover:border-amber-400'
      } ${className}`}
    >
      <img
        src={hasError ? visualInfo.fallbackImage : visualInfo.image}
        alt={visualInfo.alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover object-center select-none block"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block'
        }}
      />

      {/* Active selection badge checkmark */}
      {isSelected && (
        <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-amber-500 rounded-full flex items-center justify-center text-white text-[8px] font-black shadow-xs">
          ✓
        </div>
      )}
    </div>
  );
};

interface ServiceVisualProps {
  categoryId: number;
  className?: string;
  aspect?: 'square' | 'wide' | 'tall';
  rounded?: string;
}

/**
 * Large/Card Service Visual Banner showing human action
 */
export const ServiceVisual: React.FC<ServiceVisualProps> = ({
  categoryId,
  className = '',
  aspect = 'wide',
  rounded = 'rounded-2xl'
}) => {
  const [hasError, setHasError] = useState(false);
  const visualInfo = SERVICE_HUMAN_ACTION_VISUALS[categoryId] || SERVICE_HUMAN_ACTION_VISUALS[1];
  const aspectClass = aspect === 'square' ? 'aspect-square' : aspect === 'wide' ? 'aspect-[4/3]' : 'aspect-[3/4]';

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${aspectClass} ${rounded} ${className} border border-slate-200/80 shadow-2xs group/visual`}>
      <img
        src={hasError ? visualInfo.fallbackImage : visualInfo.image}
        alt={visualInfo.alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover object-center transform group-hover/visual:scale-106 transition-transform duration-300 block"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
