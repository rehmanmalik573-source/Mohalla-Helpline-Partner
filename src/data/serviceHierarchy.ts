import { MainCategory, Subcategory, ServiceItem, Category } from '../types';

export const serviceHierarchy: MainCategory[] = [
  // 1. HOME REPAIR & MAINTENANCE
  {
    id: 101,
    name: "Home Repair & Maintenance",
    nameHi: "गृह मरम्मत और रखरखाव",
    icon: "Wrench",
    emoji: "🏠",
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&auto=format&fit=crop&q=80",
    description: "Plumbing, electrical wiring, carpentry, house painting & emergency locks",
    descriptionHi: "प्लंबिंग, बिजली वायरिंग, कारपेंटर, पुताई व ताला चाबी मरम्मत",
    color: "bg-blue-600 text-white",
    subcategories: [
      {
        id: "plumbing",
        name: "Plumbing",
        nameHi: "प्लंबिंग",
        icon: "Wrench",
        emoji: "🔧",
        image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&auto=format&fit=crop&q=80",
        description: "Tap leakage, pipe fittings, bathroom sanitary & water motor",
        descriptionHi: "नल लीकेज, पाइप फिटिंग, बाथरूम सेनेटरी व पानी की मोटर",
        mainCategoryId: 101,
        services: [
          { id: "plumber", name: "Plumber", nameHi: "प्लंबर", subcategoryId: "plumbing", mainCategoryId: 101, avgRate: "₹250 - ₹500", tagline: "General plumbing & inspection", taglineHi: "सामान्य प्लंबिंग व जांच" },
          { id: "tap-pipe-repair", name: "Tap & Pipe Repair", nameHi: "नल और पाइप रिपेयर", subcategoryId: "plumbing", mainCategoryId: 101, avgRate: "₹200 - ₹450", tagline: "Tap replacement & pipe repair", taglineHi: "नल बदलना व पाइप ठीक करना" },
          { id: "water-motor", name: "Water Motor", nameHi: "पानी की मोटर रिपेयर", subcategoryId: "plumbing", mainCategoryId: 101, avgRate: "₹350 - ₹750", tagline: "Motor repair & capacitor change", taglineHi: "मोटर रिपेयर व कैपेसिटर चेंज" },
          { id: "bathroom-plumbing", name: "Bathroom Plumbing", nameHi: "बाथरूम प्लंबिंग", subcategoryId: "plumbing", mainCategoryId: 101, avgRate: "₹300 - ₹600", tagline: "Shower, commode & cistern fitting", taglineHi: "शावर, कमोड व सिस्टर्न फिटिंग" },
          { id: "leakage-repair", name: "Leakage Repair", nameHi: "लीकेज रिपेयर", subcategoryId: "plumbing", mainCategoryId: 101, avgRate: "₹250 - ₹550", tagline: "Wall & ceiling leak detection", taglineHi: "दीवार व छत का लीकेज रोकना" },
        ]
      },
      {
        id: "electrical",
        name: "Electrical",
        nameHi: "इलेक्ट्रिकल",
        icon: "Zap",
        emoji: "⚡",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80",
        description: "Wiring, switchboard, fans, lights & inverter installation",
        descriptionHi: "वायरिंग, स्विचबोर्ड, पंखा, लाइट व इन्वर्टर फिटिंग",
        mainCategoryId: 101,
        services: [
          { id: "electrician", name: "Electrician", nameHi: "इलेक्ट्रीशियन", subcategoryId: "electrical", mainCategoryId: 101, avgRate: "₹200 - ₹450", tagline: "Certified home electrician", taglineHi: "सर्टिफाइड इलेक्ट्रीशियन" },
          { id: "wiring", name: "Wiring", nameHi: "वायरिंग", subcategoryId: "electrical", mainCategoryId: 101, avgRate: "₹300 - ₹700", tagline: "Complete house & room wiring", taglineHi: "घर व कमरे की नई वायरिंग" },
          { id: "fan-light-repair", name: "Fan & Light Repair", nameHi: "पंखा व लाइट रिपेयर", subcategoryId: "electrical", mainCategoryId: 101, avgRate: "₹150 - ₹350", tagline: "Ceiling fan, tube & fancy light setup", taglineHi: "सीलिंग फैन व फैंसी लाइट फिटिंग" },
          { id: "switch-socket-repair", name: "Switch/Socket Repair", nameHi: "स्विच/सॉकेट रिपेयर", subcategoryId: "electrical", mainCategoryId: 101, avgRate: "₹150 - ₹300", tagline: "MCB, board & socket change", taglineHi: "MCB व सॉकेट रिप्लेसमेंट" },
          { id: "inverter-ups-installation", name: "Inverter/UPS Installation", nameHi: "इन्वर्टर/UPS इंस्टालेशन", subcategoryId: "electrical", mainCategoryId: 101, avgRate: "₹350 - ₹650", tagline: "Battery setup & inverter wiring", taglineHi: "बैटरी कनेक्शन व इन्वर्टर वायरिंग" },
        ]
      },
      {
        id: "carpenter",
        name: "Carpenter",
        nameHi: "कारपेंटर",
        icon: "Hammer",
        emoji: "🪚",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80",
        description: "Woodwork, door repair, modular furniture & custom design",
        descriptionHi: "लकड़ी काम, दरवाजा रिपेयर, फर्नीचर बनाना व पॉलिश",
        mainCategoryId: 101,
        services: [
          { id: "carpenter-pro", name: "Carpenter", nameHi: "कारपेंटर", subcategoryId: "carpenter", mainCategoryId: 101, avgRate: "₹300 - ₹600", tagline: "Skilled wood craftsman", taglineHi: "कुशल लकड़ी कारीगर" },
          { id: "furniture-repair", name: "Furniture Repair", nameHi: "फर्नीचर रिपेयर", subcategoryId: "carpenter", mainCategoryId: 101, avgRate: "₹250 - ₹500", tagline: "Bed, chair & table fixing", taglineHi: "बेड, सोफा व टेबल रिपेयर" },
          { id: "door-window-repair", name: "Door & Window Repair", nameHi: "दरवाजा व खिड़की रिपेयर", subcategoryId: "carpenter", mainCategoryId: 101, avgRate: "₹200 - ₹450", tagline: "Hinges, locks & mesh net repair", taglineHi: "कब्जा, लैच व जाली रिपेयर" },
          { id: "furniture-making", name: "Furniture Making", nameHi: "फर्नीचर निर्माण", subcategoryId: "carpenter", mainCategoryId: 101, avgRate: "₹800 - ₹2500", tagline: "Custom wardrobe & almirah making", taglineHi: "अलमारी, बेड व नया फर्नीचर" },
        ]
      },
      {
        id: "painting",
        name: "Painting",
        nameHi: "पेंटिंग",
        icon: "Paintbrush",
        emoji: "🎨",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=85",
        description: "House painting, wall putty, texture & exterior weather coat",
        descriptionHi: "दीवार पुताई, पुट्टी, टेक्सचर व एक्सटीरियर पेंट",
        mainCategoryId: 101,
        services: [
          { id: "house-painting", name: "House Painting", nameHi: "घर की पुताई", subcategoryId: "painting", mainCategoryId: 101, avgRate: "₹10/sq.ft", tagline: "Complete home wall painting", taglineHi: "पूरे घर की दीवार पुताई" },
          { id: "interior-exterior-painting", name: "Interior/Exterior Painting", nameHi: "इंटीरियर/एक्सटीरियर पेंटिंग", subcategoryId: "painting", mainCategoryId: 101, avgRate: "₹12/sq.ft", tagline: "Weather-proof exterior & premium interior", taglineHi: "वेदरप्रूफ बाहरी व सुंदर अंदरूनी पेंटिंग" },
          { id: "wall-texture", name: "Wall Texture", nameHi: "वॉल टेक्सचर", subcategoryId: "painting", mainCategoryId: 101, avgRate: "₹25/sq.ft", tagline: "Designer stencil & metallic texture", taglineHi: "डिजाइनर टेक्सचर व स्टेंसिल" },
        ]
      },
      {
        id: "cleaning",
        name: "Cleaning",
        nameHi: "क्लीनिंग",
        icon: "Sparkles",
        emoji: "✨",
        image: "https://images.unsplash.com/photo-1581578731522-a20478649934?w=600&auto=format&fit=crop&q=85",
        description: "Deep home cleaning, bathroom scrub, kitchen degrease & sofa wash",
        descriptionHi: "घर की डीप क्लीनिंग, बाथरूम सफाई, किचन व सोफा वॉश",
        mainCategoryId: 101,
        services: [
          { id: "deep-cleaning", name: "Deep Cleaning", nameHi: "डीप क्लीनिंग", subcategoryId: "cleaning", mainCategoryId: 101, avgRate: "₹399 - ₹1299", tagline: "Complete home deep cleaning & sanitization", taglineHi: "पूरे घर की गहरी सफाई व सैनिटाइजेशन" },
          { id: "bathroom-cleaning", name: "Bathroom Cleaning", nameHi: "बाथरूम सफाई", subcategoryId: "cleaning", mainCategoryId: 101, avgRate: "₹249 - ₹499", tagline: "Tile descaling, stain removal & sanitization", taglineHi: "दाग धब्बे व टाइल्स की सफाई" },
          { id: "kitchen-cleaning", name: "Kitchen Cleaning", nameHi: "किचन सफाई", subcategoryId: "cleaning", mainCategoryId: 101, avgRate: "₹299 - ₹599", tagline: "Chimney degreasing & slab stain cleaning", taglineHi: "चिमनी व स्लैब की चिकनाई सफाई" },
          { id: "sofa-cleaning", name: "Sofa Cleaning", nameHi: "सोफा क्लीनिंग", subcategoryId: "cleaning", mainCategoryId: 101, avgRate: "₹349 - ₹799", tagline: "Fabric shampoo wash & suction drying", taglineHi: "सोफा शैम्पू वॉश व सुखाना" },
        ]
      },
      {
        id: "other-home-repair",
        name: "Other Home Repair",
        nameHi: "अन्य होम रिपेयर",
        icon: "KeyRound",
        emoji: "🔑",
        image: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=600&auto=format&fit=crop&q=85",
        description: "Locksmith, glass windows, waterproofing, pest control & gardener",
        descriptionHi: "ताला चाबी, कांच खिड़की, वाटरप्रूफिंग, पेस्ट कंट्रोल व माली",
        mainCategoryId: 101,
        services: [
          { id: "locksmith", name: "Locksmith", nameHi: "ताला चाबी / लॉकस्मिथ", subcategoryId: "other-home-repair", mainCategoryId: 101, avgRate: "₹200 - ₹450", tagline: "Emergency lock opening & key making", taglineHi: "जाम ताला खोलना व चाबी बनाना" },
          { id: "glass-window", name: "Glass & Window", nameHi: "ग्लास व खिड़की", subcategoryId: "other-home-repair", mainCategoryId: 101, avgRate: "₹300 - ₹600", tagline: "Broken glass replacement & mirror fitting", taglineHi: "टूटा कांच बदलना व शीशा फिटिंग" },
          { id: "waterproofing", name: "Waterproofing", nameHi: "वाटरप्रूफिंग", subcategoryId: "other-home-repair", mainCategoryId: 101, avgRate: "₹35/sq.ft", tagline: "Roof & wall dampness chemical treatment", taglineHi: "छत व सीलन का केमिकल ट्रीटमेंट" },
          { id: "pest-control", name: "Pest Control", nameHi: "पेस्ट कंट्रोल", subcategoryId: "other-home-repair", mainCategoryId: 101, avgRate: "₹499 - ₹1299", tagline: "Termite, cockroach & mosquito treatment", taglineHi: "दीमक, कॉकरोच व मच्छर स्प्रे" },
          { id: "gardener", name: "Gardener", nameHi: "माली / गार्डनर", subcategoryId: "other-home-repair", mainCategoryId: 101, avgRate: "₹250 - ₹500", tagline: "Lawn mowing, pruning & potting", taglineHi: "पौधों की छंटाई, खाद व गमले" },
        ]
      }
    ],
    services: []
  },

  // 2. SALON, BEAUTY & WELLNESS
  {
    id: 102,
    name: "Salon, Beauty & Wellness",
    nameHi: "सैलून, ब्यूटी और वेलनेस",
    icon: "Scissors",
    emoji: "💇",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop&q=80",
    description: "Doorstep haircuts, beard grooming, facials, bridal makeup & relaxing spa for men & women",
    descriptionHi: "घर बैठे हेयरकट, दाढ़ी, फेशियल, ब्राइडल मेकअप व स्पा (पुरुष व महिला)",
    color: "bg-pink-600 text-white",
    subcategories: [
      {
        id: "salon",
        name: "Salon",
        nameHi: "सैलून",
        icon: "Scissors",
        emoji: "💇",
        image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80",
        description: "Select Men or Women for haircut, styling, coloring & grooming",
        descriptionHi: "पुरुष या महिला चुनें - हेयरकट, हेयर स्टाइलिंग व कलर",
        mainCategoryId: 102,
        hasGenderFilter: true,
        services: [
          // Men
          { id: "men-haircut", name: "Haircut", nameHi: "हेयरकट", subcategoryId: "salon", mainCategoryId: 102, genderOrType: "men", avgRate: "₹149 - ₹299", tagline: "Modern haircut & head wash", taglineHi: "स्टाइलिश हेयरकट व वाश" },
          { id: "men-styling", name: "Hair Styling", nameHi: "हेयर स्टाइलिंग", subcategoryId: "salon", mainCategoryId: 102, genderOrType: "men", avgRate: "₹199 - ₹399", tagline: "Hair setting & styling gel", taglineHi: "हेयर सेटिंग व स्टाइलिंग" },
          { id: "men-color", name: "Hair Color", nameHi: "हेयर कलर", subcategoryId: "salon", mainCategoryId: 102, genderOrType: "men", avgRate: "₹249 - ₹499", tagline: "Ammonia-free hair dye & beard color", taglineHi: "अमोनिया-फ्री हेयर व दाढ़ी कलर" },
          { id: "men-shave", name: "Shaving/Beard", nameHi: "दाढ़ी / शेविंग", subcategoryId: "salon", mainCategoryId: 102, genderOrType: "men", avgRate: "₹99 - ₹199", tagline: "Beard trim, shape & hot towel shave", taglineHi: "दाढ़ी ट्रिमिंग, शेपिंग व शेव" },
          // Women
          { id: "women-haircut", name: "Haircut", nameHi: "हेयरकट", subcategoryId: "salon", mainCategoryId: 102, genderOrType: "women", avgRate: "₹299 - ₹599", tagline: "Layer, feather & bob haircut", taglineHi: "लेयर, फेदर व बॉब हेयरकट" },
          { id: "women-styling", name: "Hair Styling", nameHi: "हेयर स्टाइलिंग", subcategoryId: "salon", mainCategoryId: 102, genderOrType: "women", avgRate: "₹349 - ₹799", tagline: "Blow dry, curls & party hairstyle", taglineHi: "ब्लो ड्राई, कर्ल्स व पार्टी स्टाइलिंग" },
          { id: "women-color", name: "Hair Color", nameHi: "हेयर कलर", subcategoryId: "salon", mainCategoryId: 102, genderOrType: "women", avgRate: "₹599 - ₹1499", tagline: "Root touchup, global & highlights", taglineHi: "रूट टचअप व ग्लोबल कलर" },
          { id: "women-hair-spa", name: "Hair Spa", nameHi: "हेयर स्पा", subcategoryId: "salon", mainCategoryId: 102, genderOrType: "women", avgRate: "₹499 - ₹999", tagline: "Deep conditioning & anti-dandruff spa", taglineHi: "डीप कंडीशनिंग व हेयर स्पा" },
        ]
      },
      {
        id: "beauty",
        name: "Beauty",
        nameHi: "ब्यूटी",
        icon: "Sparkles",
        emoji: "💄",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&auto=format&fit=crop&q=80",
        description: "Facials, cleanup, manicure, pedicure, makeup & mehndi",
        descriptionHi: "फेशियल, क्लीनअप, मेनिक्योर, पेडिक्योर, मेकअप व मेहंदी",
        mainCategoryId: 102,
        hasGenderFilter: true,
        services: [
          // Men
          { id: "men-facial", name: "Facial", nameHi: "फेशियल", subcategoryId: "beauty", mainCategoryId: 102, genderOrType: "men", avgRate: "₹399 - ₹799", tagline: "Tan removal & brightening facial", taglineHi: "टैन रिमूवल व ग्लो फेशियल" },
          { id: "men-cleanup", name: "Cleanup", nameHi: "क्लीनअप", subcategoryId: "beauty", mainCategoryId: 102, genderOrType: "men", avgRate: "₹249 - ₹449", tagline: "Blackhead removal & deep cleansing", taglineHi: "डीप क्लीनिंग व स्क्रबिंग" },
          { id: "men-manicure", name: "Manicure", nameHi: "मेनिक्योर", subcategoryId: "beauty", mainCategoryId: 102, genderOrType: "men", avgRate: "₹299 - ₹499", tagline: "Hand care, nail trimming & scrub", taglineHi: "हाथों की सफाई व नेल ट्रिम" },
          { id: "men-pedicure", name: "Pedicure", nameHi: "पेडिक्योर", subcategoryId: "beauty", mainCategoryId: 102, genderOrType: "men", avgRate: "₹349 - ₹599", tagline: "Foot soak, heel buffing & massage", taglineHi: "पैरों की सफाई व फुट मसाज" },
          // Women
          { id: "women-facial", name: "Facial", nameHi: "फेशियल", subcategoryId: "beauty", mainCategoryId: 102, genderOrType: "women", avgRate: "₹499 - ₹1299", tagline: "O3+, diamond & gold glowing facial", taglineHi: "डायमंड, गोल्ड व O3+ फेशियल" },
          { id: "women-cleanup", name: "Cleanup", nameHi: "क्लीनअप", subcategoryId: "beauty", mainCategoryId: 102, genderOrType: "women", avgRate: "₹299 - ₹599", tagline: "Fruit & herbal instant glow cleanup", taglineHi: "हर्बल व फ्रूट क्लीनअप" },
          { id: "women-manicure", name: "Manicure", nameHi: "मेनिक्योर", subcategoryId: "beauty", mainCategoryId: 102, genderOrType: "women", avgRate: "₹349 - ₹699", tagline: "Nail art, cuticles & hand polish", taglineHi: "नेल आर्ट व मैनीक्योर" },
          { id: "women-pedicure", name: "Pedicure", nameHi: "पेडिक्योर", subcategoryId: "beauty", mainCategoryId: 102, genderOrType: "women", avgRate: "₹399 - ₹799", tagline: "Aroma foot scrub & crack healing", taglineHi: "अरोमा फुट बाथ व पेडीक्योर" },
          { id: "women-makeup", name: "Makeup", nameHi: "मेकअप", subcategoryId: "beauty", mainCategoryId: 102, genderOrType: "women", avgRate: "₹799 - ₹1999", tagline: "Party, engagement & HD makeup", taglineHi: "पार्टी व HD मेकअप" },
          { id: "women-bridal", name: "Bridal Makeup", nameHi: "ब्राइडल मेकअप", subcategoryId: "beauty", mainCategoryId: 102, genderOrType: "women", avgRate: "₹3500 - ₹9999", tagline: "Full bridal package with jewelry setting", taglineHi: "संपूर्ण ब्राइडल दुल्हन मेकअप" },
          { id: "women-mehndi", name: "Mehndi", nameHi: "मेहंदी", subcategoryId: "beauty", mainCategoryId: 102, genderOrType: "women", avgRate: "₹200 - ₹1500", tagline: "Arabic, bridal & traditional henna designs", taglineHi: "अरेबिक व ब्राइडल मेहंदी डिजाइन" },
        ]
      },
      {
        id: "spa-wellness",
        name: "Spa & Wellness",
        nameHi: "स्पा और वेलनेस",
        icon: "Heart",
        emoji: "🧖",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=80",
        description: "Aromatherapy, full body massage & stress-relief wellness",
        descriptionHi: "अरोमा बॉडी स्पा, तनाव मुक्ति व फुल बॉडी मसाज",
        mainCategoryId: 102,
        hasGenderFilter: true,
        services: [
          { id: "spa-pro", name: "Spa", nameHi: "बॉडी स्पा", subcategoryId: "spa-wellness", mainCategoryId: 102, genderOrType: "all", avgRate: "₹699 - ₹1499", tagline: "Relaxing full body oil spa", taglineHi: "फुल बॉडी रिलैक्सिंग स्पा" },
          { id: "wellness-massage", name: "Massage/Wellness Services", nameHi: "मसाज व वेलनेस", subcategoryId: "spa-wellness", mainCategoryId: 102, genderOrType: "all", avgRate: "₹499 - ₹999", tagline: "Head champi, back & shoulder relief", taglineHi: "सिर की चंपी, कमर व कंधे की मालिश" },
        ]
      }
    ],
    services: []
  },

  // 3. CONSTRUCTION, MASON & WELDING
  {
    id: 103,
    name: "Construction, Mason & Welding",
    nameHi: "निर्माण, राज मिस्त्री और वेल्डिंग",
    icon: "Hammer",
    emoji: "🧱",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80",
    description: "Raj Mistri brickwork, tile flooring, home renovation, welding fabrication & contractors",
    descriptionHi: "राज मिस्त्री चिनाई, टाइल फ्लोरिंग, नवीनीकरण, वेल्डर व कांट्रेक्टर",
    color: "bg-amber-700 text-white",
    subcategories: [
      {
        id: "raj-mistri",
        name: "Raj Mistri / Mason",
        nameHi: "राज मिस्त्री",
        icon: "Hammer",
        emoji: "👷",
        image: "https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?w=600&auto=format&fit=crop&q=80",
        description: "Brick laying, cement plaster, foundation & concrete work",
        descriptionHi: "ईंट चिनाई, सीमेंट प्लास्टर, नीव व कंक्रीट लेंटर",
        mainCategoryId: 103,
        services: [
          { id: "brick-work", name: "Brick Work", nameHi: "ईंट चिनाई", subcategoryId: "raj-mistri", mainCategoryId: 103, avgRate: "₹650 - ₹950/दिन", tagline: "Wall brickwork & boundary wall", taglineHi: "दीवार चिनाई व बाउंड्री" },
          { id: "cement-work", name: "Cement Work", nameHi: "सीमेंट वर्क", subcategoryId: "raj-mistri", mainCategoryId: 103, avgRate: "₹600 - ₹900/दिन", tagline: "Cement repairs, steps & flooring base", taglineHi: "सीमेंट मरम्मत व फर्श बेस" },
          { id: "plaster-work", name: "Plaster Work", nameHi: "प्लास्टर वर्क", subcategoryId: "raj-mistri", mainCategoryId: 103, avgRate: "₹18/sq.ft", tagline: "Smooth wall & ceiling plastering", taglineHi: "दीवार व छत का स्मूथ प्लास्टर" },
          { id: "concrete-work", name: "Concrete Work", nameHi: "कंक्रीट / लेंटर", subcategoryId: "raj-mistri", mainCategoryId: 103, avgRate: "₹700 - ₹1000/दिन", tagline: "Roof slab casting & beam pillars", taglineHi: "लेंटर ढलाई व पिलर निर्माण" },
        ]
      },
      {
        id: "tile-flooring",
        name: "Tile & Flooring",
        nameHi: "टाइल और फ्लोरिंग",
        icon: "Layers",
        emoji: "🟫",
        image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600&auto=format&fit=crop&q=80",
        description: "Vitrified tiles, bathroom tiles, marble & granite fitting",
        descriptionHi: "विट्रिफाइड टाइल्स, बाथरूम टाइल, मार्बल व ग्रेनाइट",
        mainCategoryId: 103,
        services: [
          { id: "tile-work", name: "Tile Work", nameHi: "टाइल वर्क", subcategoryId: "tile-flooring", mainCategoryId: 103, avgRate: "₹18 - ₹28/sq.ft", tagline: "Floor & wall tile installation", taglineHi: "फर्श व दीवार पर टाइल लगाना" },
          { id: "floor-work", name: "Floor Work", nameHi: "फ्लोर वर्क", subcategoryId: "tile-flooring", mainCategoryId: 103, avgRate: "₹22 - ₹35/sq.ft", tagline: "Marble fitting, polishing & kota stone", taglineHi: "मार्बल घिसाई व कोटा स्टोन" },
        ]
      },
      {
        id: "renovation",
        name: "Renovation",
        nameHi: "नवीनीकरण / रेनोवेशन",
        icon: "Sparkles",
        emoji: "🔨",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&auto=format&fit=crop&q=80",
        description: "Complete home makeover, room alteration & repair",
        descriptionHi: "पूरे घर का नया रूप, कमरे की तोड़-फोड़ व नवीनीकरण",
        mainCategoryId: 103,
        services: [
          { id: "home-renovation", name: "Home Renovation", nameHi: "घर का नवीनीकरण", subcategoryId: "renovation", mainCategoryId: 103, avgRate: "Custom Quote", tagline: "Full house remodeling", taglineHi: "घर का संपूर्ण नया मेकओवर" },
          { id: "repair-renovation", name: "Repair/Renovation Work", nameHi: "मरम्मत / रेनोवेशन", subcategoryId: "renovation", mainCategoryId: 103, avgRate: "₹400 - ₹800", tagline: "Small wall modifications & fixes", taglineHi: "दीवार काटना, मरम्मत व बदलाव" },
        ]
      },
      {
        id: "welding-fabrication",
        name: "Welding & Fabrication",
        nameHi: "वेल्डिंग और फैब्रिकेशन",
        icon: "Flame",
        emoji: "👨‍🏭",
        image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=80",
        description: "Welder on site, iron main gates, balcony grill, stainless steel railing & shop shutters",
        descriptionHi: "वेल्डर ऑन-साइट, लोहे का गेट, बालकनी ग्रिल, स्टील रेलिंग व शटर",
        mainCategoryId: 103,
        services: [
          { id: "welder", name: "Welder", nameHi: "वेल्डर", subcategoryId: "welding-fabrication", mainCategoryId: 103, avgRate: "₹350 - ₹650", tagline: "Arc & gas welding on-site", taglineHi: "ऑन-साइट वेल्डिंग व मरम्मत" },
          { id: "gate-grill-work", name: "Gate & Grill Work", nameHi: "गेट और ग्रिल वर्क", subcategoryId: "welding-fabrication", mainCategoryId: 103, avgRate: "₹120/kg", tagline: "Main gate, safety door & window grills", taglineHi: "लोहे का मेन गेट व सेफ्टी ग्रिल" },
          { id: "railing-work", name: "Railing Work", nameHi: "रेलिंग वर्क", subcategoryId: "welding-fabrication", mainCategoryId: 103, avgRate: "₹350/running ft", tagline: "Stainless steel & iron balcony railing", taglineHi: "स्टेनलेस स्टील व बालकनी रेलिंग" },
          { id: "iron-steel-fabrication", name: "Iron/Steel Fabrication", nameHi: "लोहा व स्टील फैब्रिकेशन", subcategoryId: "welding-fabrication", mainCategoryId: 103, avgRate: "Custom Quote", tagline: "Tin shed, metal frames & structures", taglineHi: "टीन शेड व लोहे का ढांचा" },
          { id: "shutter-work", name: "Shutter Work", nameHi: "शटर वर्क", subcategoryId: "welding-fabrication", mainCategoryId: 103, avgRate: "₹300 - ₹700", tagline: "Shop rolling shutter repair & springs", taglineHi: "दुकान का रोलिंग शटर रिपेयर" },
        ]
      },
      {
        id: "contractor",
        name: "Contractor",
        nameHi: "ठेकेदार / कांट्रेक्टर",
        icon: "ShieldCheck",
        emoji: "🏗️",
        image: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=600&auto=format&fit=crop&q=80",
        description: "Construction contractor, civil building works & verified labour supply",
        descriptionHi: "मकान निर्माण ठेकेदार, सिविल कार्य व मजदूर सप्लाई",
        mainCategoryId: 103,
        services: [
          { id: "construction-contractor", name: "Construction Contractor", nameHi: "कंस्ट्रक्शन ठेकेदार", subcategoryId: "contractor", mainCategoryId: 103, avgRate: "₹180 - ₹260/sq.ft", tagline: "Complete house construction with/without material", taglineHi: "मकान निर्माण (विद / विदाउट मटेरियल)" },
          { id: "civil-contractor", name: "Civil Contractor", nameHi: "सिविल ठेकेदार", subcategoryId: "contractor", mainCategoryId: 103, avgRate: "Custom Quote", tagline: "Commercial & residential civil work", taglineHi: "व्यावसायिक व आवासीय सिविल कार्य" },
          { id: "labour-contractor", name: "Labour Contractor", nameHi: "लेबर ठेकेदार", subcategoryId: "contractor", mainCategoryId: 103, avgRate: "₹500 - ₹800/व्यक्ति", tagline: "Skilled & unskilled construction workers", taglineHi: "कुशल व अकुशल मजदूर उपलब्ध" },
        ]
      }
    ],
    services: []
  },

  // 4. AC & APPLIANCE REPAIR
  {
    id: 104,
    name: "AC & Appliance Repair",
    nameHi: "AC और उपकरण रिपेयर",
    icon: "Snowflake",
    emoji: "❄️",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&auto=format&fit=crop&q=80",
    description: "AC service, refrigerator, washing machine, geyser, cooler, TV, microwave & RO water purifier",
    descriptionHi: "AC गैस व सर्विस, फ्रिज, वाशिंग मशीन, गीजर, कूलर, TV, माइक्रोवेव व RO रिपेयर",
    color: "bg-sky-600 text-white",
    subcategories: [
      {
        id: "ac",
        name: "AC",
        nameHi: "AC",
        icon: "Snowflake",
        emoji: "❄️",
        image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&auto=format&fit=crop&q=80",
        description: "Split & window AC servicing, jet pump cleaning, gas charging & installation",
        descriptionHi: "स्प्लिट व विंडो AC सर्विस, जेट वाश, गैस रिफिल व इंस्टालेशन",
        mainCategoryId: 104,
        services: [
          { id: "ac-repair", name: "AC Repair", nameHi: "AC रिपेयर", subcategoryId: "ac", mainCategoryId: 104, avgRate: "₹299 - ₹599", tagline: "Cooling breakdown, PCB & fan motor fix", taglineHi: "कूलिंग समस्या, PCB व मोटर रिपेयर" },
          { id: "ac-service", name: "AC Service", nameHi: "AC सर्विस", subcategoryId: "ac", mainCategoryId: 104, avgRate: "₹399 - ₹699", tagline: "Deep foam jet cleaning & filter wash", taglineHi: "जेट पंप फोम वाश व फिल्टर सफाई" },
          { id: "ac-installation", name: "AC Installation", nameHi: "AC इंस्टालेशन", subcategoryId: "ac", mainCategoryId: 104, avgRate: "₹799 - ₹1299", tagline: "Window & split AC uninstallation / installation", taglineHi: "AC खोलना व नई जगह लगाना" },
        ]
      },
      {
        id: "home-appliances",
        name: "Home Appliances",
        nameHi: "घरेलू उपकरण",
        icon: "Tv",
        emoji: "🏠",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80",
        description: "Refrigerator, washing machine, geyser, cooler, TV & microwave repair",
        descriptionHi: "फ्रिज, वाशिंग मशीन, गीजर, कूलर, LED टीवी व माइक्रोवेव",
        mainCategoryId: 104,
        services: [
          { id: "refrigerator-repair", name: "Refrigerator Repair", nameHi: "फ्रिज रिपेयर", subcategoryId: "home-appliances", mainCategoryId: 104, avgRate: "₹299 - ₹599", tagline: "Single/double door cooling & gas charge", taglineHi: "फ्रिज कूलिंग, कंप्रेसर व गैस रिफिल" },
          { id: "washing-machine-repair", name: "Washing Machine Repair", nameHi: "वाशिंग मशीन रिपेयर", subcategoryId: "home-appliances", mainCategoryId: 104, avgRate: "₹299 - ₹599", tagline: "Front/top load motor, drain & spin fix", taglineHi: "मोटर, ड्रम व पानी ड्रेन की समस्या" },
          { id: "geyser-repair", name: "Geyser Repair", nameHi: "गीजर रिपेयर", subcategoryId: "home-appliances", mainCategoryId: 104, avgRate: "₹250 - ₹500", tagline: "Thermostat, heating coil & leak repair", taglineHi: "हीटिंग रॉड व थर्मोस्टेट बदलना" },
          { id: "cooler-repair", name: "Cooler Repair", nameHi: "कूलर रिपेयर", subcategoryId: "home-appliances", mainCategoryId: 104, avgRate: "₹199 - ₹399", tagline: "Water pump, fan motor & grass pad change", taglineHi: "पानी का पंप व मोटर रिपेयर" },
          { id: "tv-repair", name: "TV Repair", nameHi: "TV रिपेयर", subcategoryId: "home-appliances", mainCategoryId: 104, avgRate: "₹350 - ₹750", tagline: "LED/Smart TV display, backlight & audio", taglineHi: "LED टीवी डिस्प्ले व बैकलाइट रिपेयर" },
          { id: "microwave-repair", name: "Microwave Repair", nameHi: "माइक्रोवेव रिपेयर", subcategoryId: "home-appliances", mainCategoryId: 104, avgRate: "₹299 - ₹550", tagline: "Magnetron, heating & touch panel fix", taglineHi: "हीटिंग कॉइल व पैनल ठीक करना" },
        ]
      },
      {
        id: "water-appliances",
        name: "Water Appliances",
        nameHi: "वाटर उपकरण",
        icon: "Droplet",
        emoji: "💧",
        image: "https://images.unsplash.com/photo-1617155093730-a8bf47be7921?w=600&auto=format&fit=crop&q=80",
        description: "RO water purifier filter change, membrane replacement & booster pump",
        descriptionHi: "RO फिल्टर बदलना, मेम्ब्रेन सर्विस व मोटर पंप",
        mainCategoryId: 104,
        services: [
          { id: "ro-water-purifier", name: "RO/Water Purifier Repair", nameHi: "RO/वाटर प्यूरीफायर रिपेयर", subcategoryId: "water-appliances", mainCategoryId: 104, avgRate: "₹249 - ₹599", tagline: "RO servicing, filter replacement & TDS balance", taglineHi: "RO सर्विस, फिल्टर बदलना व TDS सेट करना" },
        ]
      }
    ],
    services: []
  },

  // 5. VEHICLE SERVICES
  {
    id: 105,
    name: "Vehicle Services",
    nameHi: "वाहन सेवाएं",
    icon: "Car",
    emoji: "🚗",
    image: "https://images.unsplash.com/photo-1486006396193-471d6f58c6d8?w=600&auto=format&fit=crop&q=80",
    description: "Doorstep car mechanic, bike repair, foam washing, puncture, battery & towing",
    descriptionHi: "घर बैठे कार व बाइक मैकेनिक, वाशिंग, पंचर, बैटरी जंपस्टार्ट व टोइंग",
    color: "bg-red-600 text-white",
    subcategories: [
      {
        id: "car",
        name: "Car",
        nameHi: "कार",
        icon: "Car",
        emoji: "🚗",
        image: "https://images.unsplash.com/photo-1486006396193-471d6f58c6d8?w=600&auto=format&fit=crop&q=80",
        description: "Car mechanic, electrical wiring, AC cooling & doorstep pressure wash",
        descriptionHi: "कार मैकेनिक, इलेक्ट्रिकल, AC रिपेयर व प्रेशर वाश",
        mainCategoryId: 105,
        services: [
          { id: "car-mechanic", name: "Car Mechanic", nameHi: "कार मैकेनिक", subcategoryId: "car", mainCategoryId: 105, avgRate: "₹350 - ₹750", tagline: "Engine tuning, brake pad & clutch repair", taglineHi: "इंजन ट्यूनिंग, ब्रेक व क्लच रिपेयर" },
          { id: "car-electrical", name: "Car Electrical", nameHi: "कार इलेक्ट्रिकल", subcategoryId: "car", mainCategoryId: 105, avgRate: "₹299 - ₹599", tagline: "Headlight, alternator, fuse & wiring check", taglineHi: "लाइट, वायरिंग व अल्टरनेटर चेक" },
          { id: "car-ac", name: "Car AC", nameHi: "कार AC", subcategoryId: "car", mainCategoryId: 105, avgRate: "₹499 - ₹1200", tagline: "AC gas topup, condenser wash & cooling", taglineHi: "कार AC गैस टॉपअप व सर्विस" },
          { id: "car-washing", name: "Car Washing", nameHi: "कार वाशिंग", subcategoryId: "car", mainCategoryId: 105, avgRate: "₹249 - ₹499", tagline: "Doorstep pressure wash & interior vacuum", taglineHi: "घर पर प्रेशर वाश व वैक्यूमिंग" },
        ]
      },
      {
        id: "bike-scooter",
        name: "Bike/Scooter",
        nameHi: "बाइक / स्कूटर",
        icon: "Car",
        emoji: "🏍️",
        image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80",
        description: "Motorcycle & Activa servicing, oil change, tuning & foam wash",
        descriptionHi: "बाइक व एक्टिवा सर्विस, ऑयल चेंज, ट्यूनिंग व वाश",
        mainCategoryId: 105,
        services: [
          { id: "bike-mechanic", name: "Bike Mechanic", nameHi: "बाइक मैकेनिक", subcategoryId: "bike-scooter", mainCategoryId: 105, avgRate: "₹199 - ₹399", tagline: "Oil change, chain lube & carburetor tuning", taglineHi: "ऑयल चेंज, चेन ल्यूब व ट्यूनिंग" },
          { id: "scooter-mechanic", name: "Scooter Mechanic", nameHi: "स्कूटर मैकेनिक", subcategoryId: "bike-scooter", mainCategoryId: 105, avgRate: "₹199 - ₹399", tagline: "Activa/Jupiter belt, roller & brakes", taglineHi: "एक्टिवा बेल्ट, रोलर व ब्रेक रिपेयर" },
          { id: "bike-washing", name: "Bike Washing", nameHi: "बाइक वाशिंग", subcategoryId: "bike-scooter", mainCategoryId: 105, avgRate: "₹99 - ₹199", tagline: "High-pressure foam wash & polish", taglineHi: "फोम वाश व चमक पॉलिश" },
        ]
      },
      {
        id: "roadside-services",
        name: "Roadside Services",
        nameHi: "रोडसाइड सेवाएं",
        icon: "AlertTriangle",
        emoji: "🛞",
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80",
        description: "Tubeless tyre puncture, battery jump start & flatbed vehicle towing",
        descriptionHi: "ट्यूबलेस टायर पंचर, बैटरी जंपस्टार्ट व टोइंग",
        mainCategoryId: 105,
        services: [
          { id: "tyre-puncture", name: "Tyre/Puncture", nameHi: "टायर / पंचर", subcategoryId: "roadside-services", mainCategoryId: 105, avgRate: "₹99 - ₹250", tagline: "Doorstep/roadside tubeless puncture repair", taglineHi: "घर या रास्ते में पंचर ठीक करना" },
          { id: "battery-service", name: "Battery Service", nameHi: "बैटरी सर्विस", subcategoryId: "roadside-services", mainCategoryId: 105, avgRate: "₹199 - ₹399", tagline: "Emergency jump start & battery check", taglineHi: "इमरजेंसी जंपस्टार्ट व बैटरी चेक" },
          { id: "towing", name: "Towing", nameHi: "टोइंग वाहन", subcategoryId: "roadside-services", mainCategoryId: 105, avgRate: "₹799 - ₹1800", tagline: "24x7 2-wheeler & 4-wheeler tow truck", taglineHi: "24x7 टोइंग क्रेन सेवा" },
        ]
      }
    ],
    services: []
  },

  // 6. TECHNOLOGY & SECURITY
  {
    id: 106,
    name: "Technology & Security",
    nameHi: "टेक्नोलॉजी और सुरक्षा",
    icon: "Smartphone",
    emoji: "💻",
    image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=600&auto=format&fit=crop&q=80",
    description: "Mobile repair, computer/laptop, printer, CCTV, Wi-Fi, security guard & solar",
    descriptionHi: "मोबाइल रिपेयर, लैपटॉप, प्रिंटर, CCTV, वाई-फाई, सुरक्षा गार्ड व सोलर",
    color: "bg-indigo-600 text-white",
    subcategories: [
      {
        id: "mobile",
        name: "Mobile",
        nameHi: "मोबाइल",
        icon: "Smartphone",
        emoji: "📱",
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80",
        description: "Smartphone screen display, battery, charging port & software repair",
        descriptionHi: "स्मार्टफोन स्क्रीन, बैटरी, चार्जिंग जैक व सॉफ्टवेयर",
        mainCategoryId: 106,
        services: [
          { id: "mobile-repair", name: "Mobile Repair", nameHi: "मोबाइल रिपेयर", subcategoryId: "mobile", mainCategoryId: 106, avgRate: "₹249 - ₹799", tagline: "Screen replacement, battery & charging port", taglineHi: "स्क्रीन बदलना, बैटरी व चार्जिंग पोर्ट" },
        ]
      },
      {
        id: "computer",
        name: "Computer",
        nameHi: "कंप्यूटर",
        icon: "Smartphone",
        emoji: "💻",
        image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=600&auto=format&fit=crop&q=80",
        description: "Desktop PC, laptop screen, SSD upgrade, Windows format & virus removal",
        descriptionHi: "डेस्कटॉप, लैपटॉप स्क्रीन, SSD अपग्रेड व विंडोज फॉर्मेट",
        mainCategoryId: 106,
        services: [
          { id: "computer-repair", name: "Computer Repair", nameHi: "कंप्यूटर रिपेयर", subcategoryId: "computer", mainCategoryId: 106, avgRate: "₹299 - ₹599", tagline: "Desktop CPU, motherboard & SMPS fix", taglineHi: "CPU, मदरबोर्ड व पावर सप्लाई रिपेयर" },
          { id: "laptop-repair", name: "Laptop Repair", nameHi: "लैपटॉप रिपेयर", subcategoryId: "computer", mainCategoryId: 106, avgRate: "₹350 - ₹750", tagline: "Laptop keyboard, hinges, screen & SSD upgrade", taglineHi: "कीबोर्ड, हिंज, डिस्प्ले व SSD अपग्रेड" },
          { id: "software-basic-service", name: "Software/Basic Computer Service", nameHi: "सॉफ्टवेयर / बेसिक कंप्यूटर सर्विस", subcategoryId: "computer", mainCategoryId: 106, avgRate: "₹200 - ₹400", tagline: "Windows installation, antivirus & driver setup", taglineHi: "विंडोज इंस्टालेशन, एंटीवायरस व सेटअप" },
        ]
      },
      {
        id: "office-devices",
        name: "Office Devices",
        nameHi: "ऑफिस उपकरण",
        icon: "Smartphone",
        emoji: "🖨️",
        image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&auto=format&fit=crop&q=80",
        description: "Laser & inkjet printer cartridge refill, paper jam & driver config",
        descriptionHi: "प्रिंटर कार्ट्रिज रिफिल, पेपर जैम व ड्राइवर रिपेयर",
        mainCategoryId: 106,
        services: [
          { id: "printer-repair", name: "Printer Repair", nameHi: "प्रिंटर रिपेयर", subcategoryId: "office-devices", mainCategoryId: 106, avgRate: "₹250 - ₹500", tagline: "Printer cartridge refilling & roller repair", taglineHi: "कार्ट्रिज रिफिल व रोलर ठीक करना" },
        ]
      },
      {
        id: "security-connectivity",
        name: "Security & Connectivity",
        nameHi: "सुरक्षा और कनेक्टिविटी",
        icon: "ShieldCheck",
        emoji: "🔐",
        image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&auto=format&fit=crop&q=80",
        description: "CCTV camera fitting, Wi-Fi router setup & verified security guards",
        descriptionHi: "CCTV कैमरा फिटिंग, वाई-फाई राउटर व सुरक्षा गार्ड",
        mainCategoryId: 106,
        services: [
          { id: "cctv-installation", name: "CCTV Installation", nameHi: "CCTV इंस्टालेशन", subcategoryId: "security-connectivity", mainCategoryId: 106, avgRate: "₹299/कैमरा", tagline: "HD/IP CCTV camera setup, DVR & mobile view", taglineHi: "CCTV कैमरा फिटिंग व मोबाइल कनेक्ट" },
          { id: "wifi-internet-setup", name: "Wi-Fi/Internet Setup", nameHi: "वाई-फाई / इंटरनेट सेटअप", subcategoryId: "security-connectivity", mainCategoryId: 106, avgRate: "₹199 - ₹399", tagline: "Router configuration, LAN wiring & range extension", taglineHi: "राउटर सेटअप, LAN तार व स्पीड सेटिंग" },
          { id: "security-guard", name: "Security Guard", nameHi: "सुरक्षा गार्ड", subcategoryId: "security-connectivity", mainCategoryId: 106, avgRate: "₹12000 - ₹18000/माह", tagline: "Residential, Shop/Office, Gate & Event Security", taglineHi: "आवासीय, दुकान/ऑफिस, गेट व इवेंट सुरक्षा" },
        ]
      },
      {
        id: "power-technology",
        name: "Power Technology",
        nameHi: "पावर टेक्नोलॉजी",
        icon: "Zap",
        emoji: "☀️",
        image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80",
        description: "Solar panel rooftop installation, inverter battery sync & solar maintenance",
        descriptionHi: "रूफटॉप सोलर पैनल लगाना, इन्वर्टर कनेक्शन व सोलर सर्विस",
        mainCategoryId: 106,
        services: [
          { id: "solar-installation-repair", name: "Solar Installation/Repair", nameHi: "सोलर इंस्टालेशन / रिपेयर", subcategoryId: "power-technology", mainCategoryId: 106, avgRate: "₹500 - ₹2000", tagline: "Solar panel mounting, wiring & grid connection", taglineHi: "सोलर पैनल फिटिंग व ग्रिड कनेक्शन" },
        ]
      }
    ],
    services: []
  },

  // 7. RIDE & TRANSPORT
  {
    id: 107,
    name: "Ride & Transport",
    nameHi: "राइड और ट्रांसपोर्ट",
    icon: "Car",
    emoji: "🚕",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&auto=format&fit=crop&q=80",
    description: "Local cabs, bike taxi, auto, drivers on demand & goods tempo transport",
    descriptionHi: "लोकल कैब, बाइक टैक्सी, ऑटो, ड्राइवर ऑन डिमांड व छोटा हाथी माल ढुलाई",
    color: "bg-amber-500 text-slate-900",
    subcategories: [
      {
        id: "local-rides",
        name: "Local Rides",
        nameHi: "लोकल राइड्स",
        icon: "Car",
        emoji: "🚕",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&auto=format&fit=crop&q=80",
        description: "Fast doorstep pickup for local rides in the neighborhood",
        descriptionHi: "मोहल्ले में तुरंत राइड पिकअप - कैब, बाइक व ऑटो",
        mainCategoryId: 107,
        services: [
          { id: "cab-taxi", name: "Cab/Taxi", nameHi: "कैब / टैक्सी", subcategoryId: "local-rides", mainCategoryId: 107, avgRate: "₹12/km", tagline: "Sedan & hatchback AC car on demand", taglineHi: "AC कार व सुरक्षित यात्रा" },
          { id: "bike-taxi", name: "Bike Taxi", nameHi: "बाइक टैक्सी", subcategoryId: "local-rides", mainCategoryId: 107, avgRate: "₹6/km", tagline: "Fast single-rider bike ride to beat traffic", taglineHi: "ट्रैफिक में सबसे तेज व सस्ती राइड" },
          { id: "auto", name: "Auto", nameHi: "ऑटो", subcategoryId: "local-rides", mainCategoryId: 107, avgRate: "₹10/km", tagline: "Local CNG auto rickshaw for family & market", taglineHi: "लोकल बाजार व परिवार के लिए ऑटो" },
        ]
      },
      {
        id: "driver",
        name: "Driver",
        nameHi: "ड्राइवर",
        icon: "User",
        emoji: "👨‍✈️",
        image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&auto=format&fit=crop&q=80",
        description: "Verified professional driver for your personal car on hourly or daily basis",
        descriptionHi: "अपनी निजी कार के लिए अनुभवी ड्राइवर (घंटे या दिन के अनुसार)",
        mainCategoryId: 107,
        services: [
          { id: "driver-on-demand", name: "Driver on Demand", nameHi: "मांग पर ड्राइवर", subcategoryId: "driver", mainCategoryId: 107, avgRate: "₹299/4 घंटे", tagline: "City drive, outstation & party drop driver", taglineHi: "शहर व बाहर जाने के लिए ड्राइवर" },
        ]
      },
      {
        id: "transport",
        name: "Transport",
        nameHi: "ट्रांसपोर्ट",
        icon: "Truck",
        emoji: "🚐",
        image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&auto=format&fit=crop&q=80",
        description: "Chhota Hathi, pickup van & local goods transport vehicles",
        descriptionHi: "छोटा हाथी, पिकअप वैन व लोकल माल ढुलाई",
        mainCategoryId: 107,
        services: [
          { id: "tempo-van", name: "Tempo/Van", nameHi: "टेम्पो / वैन", subcategoryId: "transport", mainCategoryId: 107, avgRate: "₹350 + ₹25/km", tagline: "Tata Ace (Chhota Hathi) & Bolero pickup", taglineHi: "टाटा ऐस व बोलेरो पिकअप वैन" },
          { id: "local-goods-transport", name: "Local Goods Transport", nameHi: "लोकल माल ढुलाई", subcategoryId: "transport", mainCategoryId: 107, avgRate: "Custom Quote", tagline: "Shop materials, hardware & furniture transport", taglineHi: "दुकान का सामान व माल ढुलाई" },
        ]
      }
    ],
    services: []
  },

  // 8. DELIVERY & MOVING
  {
    id: 108,
    name: "Delivery & Moving",
    nameHi: "डिलीवरी और शिफ्टिंग",
    icon: "Truck",
    emoji: "📦",
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600&auto=format&fit=crop&q=80",
    description: "Express local parcel delivery, packers & movers, house/office shifting & loading labour",
    descriptionHi: "लोकल पार्सल डिलीवरी, पैकर्स एंड मूवर्स, घर/दुकान शिफ्टिंग व लोडिंग लेबर",
    color: "bg-orange-600 text-white",
    subcategories: [
      {
        id: "delivery",
        name: "Delivery",
        nameHi: "डिलीवरी",
        icon: "Package",
        emoji: "📦",
        image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600&auto=format&fit=crop&q=80",
        description: "Door-to-door parcel, documents, food & medicine express delivery",
        descriptionHi: "पार्सल, दस्तावेज, दवाई व सामान की तत्काल डिलीवरी",
        mainCategoryId: 108,
        services: [
          { id: "parcel-local-delivery", name: "Parcel/Local Delivery", nameHi: "पार्सल / लोकल डिलीवरी", subcategoryId: "delivery", mainCategoryId: 108, avgRate: "₹49 - ₹149", tagline: "Quick 30-min neighborhood courier", taglineHi: "30 मिनट में मोहल्ले में डिलीवरी" },
        ]
      },
      {
        id: "moving",
        name: "Moving",
        nameHi: "शिफ्टिंग / मूवर्स",
        icon: "Truck",
        emoji: "🚚",
        image: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=600&auto=format&fit=crop&q=80",
        description: "Professional house shifting, packing, bubble wrap & office relocation",
        descriptionHi: "घर व ऑफिस का सामान सुरक्षित पैक व शिफ्ट करना",
        mainCategoryId: 108,
        services: [
          { id: "packers-movers", name: "Packers & Movers", nameHi: "पैकर्स एंड मूवर्स", subcategoryId: "moving", mainCategoryId: 108, avgRate: "₹2499 - ₹6999", tagline: "End-to-end packing, vehicle & unpacking", taglineHi: "संपूर्ण पैकिंग व सुरक्षित ट्रांसपोर्ट" },
          { id: "house-shifting", name: "House Shifting", nameHi: "घर की शिफ्टिंग", subcategoryId: "moving", mainCategoryId: 108, avgRate: "₹1999 - ₹4999", tagline: "Local 1BHK/2BHK apartment shifting", taglineHi: "लोकल 1/2 BHK घर शिफ्टिंग" },
          { id: "office-shifting", name: "Office Shifting", nameHi: "ऑफिस शिफ्टिंग", subcategoryId: "moving", mainCategoryId: 108, avgRate: "Custom Quote", tagline: "Desks, computers & office equipment move", taglineHi: "ऑफिस डेस्क, कंप्यूटर व उपकरण शिफ्ट" },
        ]
      },
      {
        id: "moving-labour",
        name: "Moving Labour",
        nameHi: "शिफ्टिंग लेबर",
        icon: "User",
        emoji: "👷",
        image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=600&auto=format&fit=crop&q=80",
        description: "Helpers for loading, unloading & heavy furniture lifting up stairs",
        descriptionHi: "भारी सामान उठाने, सीढ़ियों से चढ़ाने व लोडिंग के लिए हेल्पर",
        mainCategoryId: 108,
        services: [
          { id: "loading-unloading", name: "Loading/Unloading", nameHi: "लोडिंग / अनलोडिंग", subcategoryId: "moving-labour", mainCategoryId: 108, avgRate: "₹350 - ₹600/व्यक्ति", tagline: "Strong helpers for boxes & heavy furniture", taglineHi: "भारी अलमारी, फ्रिज व बॉक्स उठाने वाले सहायक" },
        ]
      }
    ],
    services: []
  },

  // 9. ACCOUNTANT & BUSINESS (Dedicated Main Category)
  {
    id: 109,
    name: "Accountant & Business",
    nameHi: "अकाउंटेंट और बिजनेस",
    icon: "Calculator",
    emoji: "📊",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop&q=80",
    description: "Accountant, bookkeeping, Tally, GST return, ITR tax filing, billing & business registration",
    descriptionHi: "अकाउंटेंट, बहीखाता, टैली, GST रिटर्न, इनकम टैक्स ITR, बिलिंग व फर्म रजिस्ट्रेशन",
    color: "bg-emerald-700 text-white",
    subcategories: [
      {
        id: "accounting",
        name: "Accounting",
        nameHi: "अकाउंटिंग",
        icon: "Calculator",
        emoji: "👨‍💼",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop&q=80",
        description: "Monthly bookkeeping, accounts maintenance & Tally entry",
        descriptionHi: "मासिक हिसाब-किताब, बहीखाता व टैली में एंट्री",
        mainCategoryId: 109,
        services: [
          { id: "accountant-pro", name: "Accountant", nameHi: "अकाउंटेंट", subcategoryId: "accounting", mainCategoryId: 109, avgRate: "₹3000 - ₹8000/माह", tagline: "Experienced business & shop accountant", taglineHi: "दुकान व फर्म के लिए अनुभवी अकाउंटेंट" },
          { id: "bookkeeping", name: "Bookkeeping", nameHi: "बहीखाता / मुनीम", subcategoryId: "accounting", mainCategoryId: 109, avgRate: "₹1500 - ₹4000/माह", tagline: "Ledger maintenance & daily sales/purchase entry", taglineHi: "दैनिक खरीद-बिक्री व लेजर मेंटेनेंस" },
          { id: "tally", name: "Tally", nameHi: "टैली अकाउंटिंग", subcategoryId: "accounting", mainCategoryId: 109, avgRate: "₹2000 - ₹5000", tagline: "Tally Prime ledger creation, GST vouchers & stock", taglineHi: "टैली प्राइम वाउचर व स्टॉक मैनेजमेंट" },
        ]
      },
      {
        id: "tax-gst",
        name: "Tax & GST",
        nameHi: "टैक्स और GST",
        icon: "Calculator",
        emoji: "🧾",
        image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80",
        description: "GST registration, monthly GSTR-1/3B filing & personal/business ITR",
        descriptionHi: "GST रजिस्ट्रेशन, मासिक रिटर्न व इनकम टैक्स फाइलिंग",
        mainCategoryId: 109,
        services: [
          { id: "gst-services", name: "GST Services", nameHi: "GST सेवाएं", subcategoryId: "tax-gst", mainCategoryId: 109, avgRate: "₹499 - ₹1200", tagline: "GST registration, monthly GSTR 1 & 3B filing", taglineHi: "नया GST नंबर व मासिक रिटर्न फाइलिंग" },
          { id: "itr-income-tax", name: "ITR/Income Tax", nameHi: "ITR / इनकम टैक्स", subcategoryId: "tax-gst", mainCategoryId: 109, avgRate: "₹499 - ₹1499", tagline: "ITR-1, 2, 3, 4 filing with maximum refund", taglineHi: "इनकम टैक्स रिटर्न व रिफंड क्लेम" },
          { id: "tax-consultant", name: "Tax Consultant", nameHi: "टैक्स कंसलटेंट", subcategoryId: "tax-gst", mainCategoryId: 109, avgRate: "₹500 - ₹1500", tagline: "Tax saving planning, audit notice response & advice", taglineHi: "टैक्स बचत सलाह व नोटिस समाधान" },
        ]
      },
      {
        id: "business",
        name: "Business",
        nameHi: "बिजनेस सेवाएं",
        icon: "ShieldCheck",
        emoji: "💼",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80",
        description: "Billing & invoice setup, payroll management & business registration",
        descriptionHi: "बिलिंग सॉफ्टवेयर, पेरोल/सैलरी व नया बिजनेस रजिस्ट्रेशन",
        mainCategoryId: 109,
        services: [
          { id: "billing-invoice", name: "Billing & Invoice", nameHi: "बिलिंग और इनवॉइस", subcategoryId: "business", mainCategoryId: 109, avgRate: "₹300 - ₹800", tagline: "Vyapar/Zoho invoice design & bill print setup", taglineHi: "बिलिंग सॉफ्टवेयर व इनवॉइस डिजाइन" },
          { id: "payroll", name: "Payroll", nameHi: "पेरोल / सैलरी", subcategoryId: "business", mainCategoryId: 109, avgRate: "₹1000 - ₹3000", tagline: "Staff salary calculation, attendance & slip generation", taglineHi: "कर्मचारी हाजिरी, सैलरी व स्लिप" },
          { id: "business-registration", name: "Business Registration", nameHi: "बिजनेस रजिस्ट्रेशन", subcategoryId: "business", mainCategoryId: 109, avgRate: "₹999 - ₹2999", tagline: "MSME, Udyam, Trade license & Shop act registration", taglineHi: "उद्यम, MSME व शॉप एक्ट रजिस्ट्रेशन" },
        ]
      }
    ],
    services: []
  },

  // 10. EDUCATION & TUITION
  {
    id: 110,
    name: "Education & Tuition",
    nameHi: "शिक्षा और ट्यूशन",
    icon: "BookOpen",
    emoji: "📚",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop&q=80",
    description: "Home tutors, school tuition for all classes, Maths, Science, English, Computer & exam coaching",
    descriptionHi: "होम ट्यूटर, स्कूल ट्यूशन, गणित, विज्ञान, इंग्लिश, कंप्यूटर व कोचिंग",
    color: "bg-violet-700 text-white",
    subcategories: [
      {
        id: "tuition",
        name: "Tuition",
        nameHi: "ट्यूशन",
        icon: "BookOpen",
        emoji: "🧑‍🏫",
        image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop&q=80",
        description: "One-on-one personal home teacher or small neighborhood batch",
        descriptionHi: "घर पर व्यक्तिगत शिक्षक या मोहल्ला बैच",
        mainCategoryId: 110,
        services: [
          { id: "home-tutor", name: "Home Tutor", nameHi: "होम ट्यूटर", subcategoryId: "tuition", mainCategoryId: 110, avgRate: "₹1500 - ₹4000/माह", tagline: "Qualified home tutor visiting your house", taglineHi: "घर आकर पढ़ाने वाले योग्य शिक्षक" },
          { id: "school-tuition", name: "School Tuition", nameHi: "स्कूल ट्यूशन", subcategoryId: "tuition", mainCategoryId: 110, avgRate: "₹800 - ₹2000/माह", tagline: "Class 1st to 10th all subjects daily tuition", taglineHi: "कक्षा 1 से 10वीं तक सभी विषय" },
        ]
      },
      {
        id: "subject-tutor",
        name: "Subject Tutor",
        nameHi: "विषय ट्यूटर",
        icon: "BookOpen",
        emoji: "📖",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80",
        description: "Specialized subject expert for board exams and concept clarity",
        descriptionHi: "बोर्ड परीक्षा व कठिन विषयों के विशेषज्ञ शिक्षक",
        mainCategoryId: 110,
        services: [
          { id: "maths-tutor", name: "Maths", nameHi: "गणित ट्यूटर", subcategoryId: "subject-tutor", mainCategoryId: 110, avgRate: "₹1000 - ₹2500/माह", tagline: "Algebra, calculus, geometry & Vedic maths", taglineHi: "गणित फॉर्मूला व बेसिक से एडवांस सीखें" },
          { id: "science-tutor", name: "Science", nameHi: "साइंस ट्यूटर", subcategoryId: "subject-tutor", mainCategoryId: 110, avgRate: "₹1000 - ₹2500/माह", tagline: "Physics, Chemistry & Biology coaching", taglineHi: "फिजिक्स, केमिस्ट्री व बायोलॉजी" },
          { id: "english-tutor", name: "English", nameHi: "इंग्लिश स्पीकिंग व ग्रामर", subcategoryId: "subject-tutor", mainCategoryId: 110, avgRate: "₹800 - ₹2000/माह", tagline: "Spoken English, grammar, writing & reading", taglineHi: "बोलचाल की इंग्लिश व ग्रामर" },
        ]
      },
      {
        id: "other-education",
        name: "Other Education",
        nameHi: "अन्य शिक्षा",
        icon: "Smartphone",
        emoji: "💻",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80",
        description: "Basic computer course tutor & competitive exam guidance",
        descriptionHi: "कंप्यूटर बेसिक, एक्सेल व प्रतियोगी परीक्षा तैयारी",
        mainCategoryId: 110,
        services: [
          { id: "computer-tutor", name: "Computer Tutor", nameHi: "कंप्यूटर ट्यूटर", subcategoryId: "other-education", mainCategoryId: 110, avgRate: "₹1000 - ₹2500/माह", tagline: "MS Office, Excel, Internet & Coding for kids", taglineHi: "MS ऑफिस, एक्सेल व बच्चों की कोडिंग" },
          { id: "exam-coaching", name: "Exam Coaching", nameHi: "प्रतियोगी परीक्षा कोचिंग", subcategoryId: "other-education", mainCategoryId: 110, avgRate: "₹1500 - ₹3500/माह", tagline: "Govt job, police, railway & entrance tests", taglineHi: "सरकारी नौकरी व प्रवेश परीक्षा तैयारी" },
        ]
      }
    ],
    services: []
  },

  // 11. PROFESSIONAL SERVICES
  {
    id: 111,
    name: "Professional Services",
    nameHi: "प्रोफेशनल सेवाएं",
    icon: "ShieldCheck",
    emoji: "👨‍💼",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80",
    description: "Legal lawyers, architects, civil engineers, interior designers, property consultants & documentation",
    descriptionHi: "वकील, आर्किटेक्ट नक्शा नवीस, इंटीरियर डिजाइनर, प्रॉपर्टी कंसलटेंट व दस्तावेज",
    color: "bg-slate-800 text-white",
    subcategories: [
      {
        id: "legal",
        name: "Legal",
        nameHi: "कानूनी",
        icon: "ShieldCheck",
        emoji: "⚖️",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
        description: "Legal consultation, agreement drafting, court matters & notice handling",
        descriptionHi: "कानूनी सलाह, एग्रीमेंट, कोर्ट मामले व नोटिस जवाब",
        mainCategoryId: 111,
        services: [
          { id: "lawyer", name: "Lawyer", nameHi: "वकील / एडवोकेट", subcategoryId: "legal", mainCategoryId: 111, avgRate: "₹500 - ₹2000", tagline: "Civil, criminal & property legal advice", taglineHi: "सिविल, क्रिमिनल व प्रॉपर्टी कानूनी सलाह" },
        ]
      },
      {
        id: "design-technical",
        name: "Design & Technical",
        nameHi: "डिजाइन व तकनीकी",
        icon: "Sparkles",
        emoji: "🏛️",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&auto=format&fit=crop&q=80",
        description: "House map plan, structural engineering & 3D modular interior design",
        descriptionHi: "मकान का नक्शा (2D/3D), स्ट्रक्चरल प्लान व इंटीरियर",
        mainCategoryId: 111,
        services: [
          { id: "architect", name: "Architect", nameHi: "आर्किटेक्ट / नक्शा", subcategoryId: "design-technical", mainCategoryId: 111, avgRate: "₹15 - ₹35/sq.ft", tagline: "2D floor plan, 3D elevation & municipal sanction map", taglineHi: "मकान का 2D/3D नक्शा व एलिवेशन" },
          { id: "engineer", name: "Engineer", nameHi: "इंजीनियर", subcategoryId: "design-technical", mainCategoryId: 111, avgRate: "₹1000 - ₹3000", tagline: "Structural stability calculation & site supervision", taglineHi: "स्ट्रक्चरल लोड डिजाइन व साइट इंस्पेक्शन" },
          { id: "interior-designer", name: "Interior Designer", nameHi: "इंटीरियर डिजाइनर", subcategoryId: "design-technical", mainCategoryId: 111, avgRate: "₹25 - ₹60/sq.ft", tagline: "False ceiling, modular kitchen & 3D room styling", taglineHi: "फॉल्स सीलिंग, मॉड्यूलर किचन व डेकोर" },
        ]
      },
      {
        id: "property",
        name: "Property",
        nameHi: "प्रॉपर्टी",
        icon: "Home",
        emoji: "🏘️",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&auto=format&fit=crop&q=80",
        description: "Rent, buy, sell houses, shops & registry documentation in neighborhood",
        descriptionHi: "मकान, दुकान किराया/खरीद-बिक्री व रजिस्ट्री सहायता",
        mainCategoryId: 111,
        services: [
          { id: "property-consultant", name: "Property Consultant", nameHi: "प्रॉपर्टी कंसलटेंट", subcategoryId: "property", mainCategoryId: 111, avgRate: "15 दिन किराया / 1% कमीशन", tagline: "Rental homes, plots & commercial shops in area", taglineHi: "किराये पर मकान व दुकान दिलाना" },
        ]
      },
      {
        id: "other-professional",
        name: "Other Professional",
        nameHi: "अन्य प्रोफेशनल",
        icon: "Calculator",
        emoji: "📄",
        image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80",
        description: "Vehicle & health insurance advisor, rent agreement & stamp affidavit",
        descriptionHi: "बीमा एजेंट, रेंट एग्रीमेंट, शपथ पत्र व दस्तावेज",
        mainCategoryId: 111,
        services: [
          { id: "insurance-agent", name: "Insurance Agent", nameHi: "इंश्योरेंस एजेंट", subcategoryId: "other-professional", mainCategoryId: 111, avgRate: "Free Consultation", tagline: "Bike, car, health & life insurance claims", taglineHi: "गाड़ी, स्वास्थ्य व जीवन बीमा" },
          { id: "documentation-service", name: "Documentation Service", nameHi: "दस्तावेज व एफिडेविट", subcategoryId: "other-professional", mainCategoryId: 111, avgRate: "₹150 - ₹500", tagline: "Rent agreement, notary, affidavit & online form", taglineHi: "रेंट एग्रीमेंट, शपथ पत्र व नोटरी" },
        ]
      }
    ],
    services: []
  }
];

// Helper to generate flattened Category list for components expecting Category[]
export const generateFlatCategories = (): Category[] => {
  let counter = 1;
  const list: Category[] = [];

  serviceHierarchy.forEach(main => {
    main.subcategories.forEach(sub => {
      // Create a representative category for each subcategory
      const serviceNames = sub.services.map(s => s.name);
      const serviceNamesHi = sub.services.map(s => s.nameHi);

      const cat: Category = {
        id: counter++,
        name: sub.name,
        nameHi: sub.nameHi,
        icon: sub.emoji || "🔧",
        color: main.color,
        image: sub.image || main.image,
        tagline: sub.description || main.description,
        taglineHi: sub.descriptionHi || main.descriptionHi,
        avgRate: sub.services[0]?.avgRate || "₹250 - ₹500",
        commonServices: serviceNames,
        commonServicesHi: serviceNamesHi,
        mainCategoryId: main.id,
        mainCategoryName: main.name,
        mainCategoryNameHi: main.nameHi,
        subcategoryId: sub.id,
        subcategoryName: sub.name,
        subcategoryNameHi: sub.nameHi,
      };

      list.push(cat);
    });
  });

  return list;
};
