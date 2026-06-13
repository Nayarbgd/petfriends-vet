export interface ServiceBenefit {
  icon: string;
  title: string;
  body: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  tagline: string;
  metaTitle: string;
  metaDesc: string;
  heroHeadline: string;
  heroSub: string;
  whyHeading: string;
  benefits: ServiceBenefit[];
  faqs: ServiceFaq[];
}

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "checkup",
    title: "Veterinary Check-ups",
    tagline: "Prevention is the best medicine",
    metaTitle: "Veterinary Check-ups in JVC Dubai | Pet Friends Vet Clinic",
    metaDesc:
      "Regular vet check-ups catch health problems early — before they become serious or expensive. Book your pet's wellness exam in JVC Dubai today.",
    heroHeadline: "Your Pet Can't Tell You When Something's Wrong",
    heroSub:
      "Routine check-ups are the single most powerful tool you have to keep your pet healthy, happy, and by your side for as long as possible.",
    whyHeading: "Why Regular Check-ups Are Essential for Your Pet",
    benefits: [
      {
        icon: "🔍",
        title: "Early Detection Saves Lives",
        body:
          "Most serious conditions — heart disease, kidney disease, diabetes, tumours — show no obvious signs in their early stages. A thorough physical exam can detect subtle changes that would be invisible to even the most attentive owner. Catching problems early means simpler treatment, faster recovery, and significantly lower cost.",
      },
      {
        icon: "📈",
        title: "Pets Age Faster Than We Do",
        body:
          "One human year equals roughly 5–7 pet years. That means skipping a single annual check-up is equivalent to you going 5–7 years without seeing a doctor. A lot can change in that time. Twice-yearly exams are recommended for senior pets (7+ years) precisely because their biology changes so quickly.",
      },
      {
        icon: "💊",
        title: "Tailored Preventive Care",
        body:
          "Every pet is different. A check-up isn't just a once-over — it's a conversation. Your vet will assess weight, dental health, joint mobility, coat condition, heart rate, and more, then build a personalised wellness plan. This is the moment to update parasite prevention, adjust diet, and plan upcoming vaccinations.",
      },
      {
        icon: "🧘",
        title: "Peace of Mind for You",
        body:
          "Not knowing whether your pet is truly healthy is stressful. A clean bill of health from a qualified vet gives you real confidence — and when something does need attention, you'll feel reassured knowing you caught it in time. Regular visits also help your pet build a positive relationship with the clinic, reducing anxiety at future appointments.",
      },
    ],
    faqs: [
      {
        q: "How often should my pet have a check-up?",
        a: "For adult pets (1–7 years), once a year is the general guideline. Puppies, kittens, and senior pets (7+) benefit from visits every 6 months due to faster developmental and age-related changes.",
      },
      {
        q: "What happens during a wellness exam?",
        a: "The vet will assess your pet's weight, body condition, eyes, ears, teeth, skin, coat, heart, lungs, abdomen, and joints. We'll also discuss diet, behaviour, parasite prevention, and any upcoming vaccines.",
      },
      {
        q: "My pet seems healthy — do I still need a check-up?",
        a: "Absolutely. Many conditions are clinically silent until they are quite advanced. A wellness visit is about proactive care, not just reacting to obvious symptoms.",
      },
      {
        q: "Do you check-up exotic pets like rabbits?",
        a: "Yes. We see dogs, cats, and small pets including rabbits. Contact us for exotic animals and we will let you know if we can help.",
      },
    ],
  },

  {
    slug: "vaccination",
    title: "Vaccinations",
    tagline: "Shield your pet from life-threatening disease",
    metaTitle: "Pet Vaccinations in JVC Dubai | Pet Friends Vet Clinic",
    metaDesc:
      "Protect your pet from parvovirus, distemper, rabies and more. Full vaccination protocols with travel documentation issued. Book in JVC Dubai today.",
    heroHeadline: "A Single Jab Can Protect Your Pet for Years",
    heroSub:
      "Vaccines train your pet's immune system to fight dangerous diseases before they ever encounter them — often for a fraction of the cost of treating the illness.",
    whyHeading: "Why Vaccination Is the Smartest Investment in Your Pet's Health",
    benefits: [
      {
        icon: "🛡️",
        title: "Protection Against Deadly Diseases",
        body:
          "Parvovirus, distemper, leptospirosis, and rabies are all potentially fatal — and all preventable. These diseases spread easily in urban environments like Dubai, where pets come into contact with other animals at parks, groomers, and kennels. A vaccine-protected pet has a dramatically higher chance of surviving an exposure.",
      },
      {
        icon: "✈️",
        title: "Mandatory for Travel",
        body:
          "If you ever plan to travel internationally with your pet or bring them to the UAE from abroad, up-to-date vaccinations and an official health certificate are legally required. We issue full travel documentation that meets UAE, EU, and UK import requirements — so your pet's paperwork is always ready.",
      },
      {
        icon: "🤝",
        title: "Protects Your Family Too",
        body:
          "Some diseases — like leptospirosis and rabies — are zoonotic, meaning they can pass from pets to humans. Vaccinating your pet is not just about their health; it protects every member of your household, especially young children and elderly family members who are most vulnerable.",
      },
      {
        icon: "💰",
        title: "Prevention Costs a Fraction of Treatment",
        body:
          "Treating a dog with parvovirus can cost thousands of dirhams and still may not save the pet's life. A full puppy vaccination series costs a small fraction of that. Staying current on boosters is the most cost-effective decision you can make as a pet owner.",
      },
    ],
    faqs: [
      {
        q: "What vaccines does my dog or cat need?",
        a: "Core vaccines for dogs include DHPPi (distemper, hepatitis, parvovirus, parainfluenza) and rabies. For cats: FVRCP and rabies. Non-core vaccines (like kennel cough or FeLV) are recommended based on lifestyle. We'll assess your pet and recommend the right protocol.",
      },
      {
        q: "When should I start vaccinating a puppy or kitten?",
        a: "Puppies and kittens typically start their vaccine series at 6–8 weeks of age, with boosters every 3–4 weeks until 16 weeks, then annual or triennial boosters depending on the vaccine.",
      },
      {
        q: "Do you issue vaccination booklets for international travel?",
        a: "Yes. We provide official vaccination records and health certificates that meet UAE and international travel requirements.",
      },
      {
        q: "My pet had a reaction to a vaccine before. Can you still vaccinate?",
        a: "Tell us about any previous reactions before the appointment. We will assess the risk, choose the safest protocol, and monitor your pet after the injection.",
      },
    ],
  },

  {
    slug: "deworming",
    title: "Deworming",
    tagline: "Hidden parasites, visible consequences",
    metaTitle: "Pet Deworming in JVC Dubai | Pet Friends Vet Clinic",
    metaDesc:
      "Internal parasites can harm your pet silently for months. Regular deworming keeps your dog, cat, and family safe. Schedule in JVC Dubai today.",
    heroHeadline: "Parasites Live Inside Your Pet Without a Single Sign",
    heroSub:
      "Roundworms, hookworms, tapeworms — they can live undetected for months, silently stealing nutrients and damaging organs. Regular deworming is simple, fast, and vital.",
    whyHeading: "Why Deworming Is a Non-Negotiable Part of Pet Care",
    benefits: [
      {
        icon: "🪱",
        title: "Parasites Are Everywhere in Urban Dubai",
        body:
          "Worm eggs survive in soil, grass, water, and even on surfaces pets walk on every day. Pets get infected by sniffing, licking, or eating contaminated material — all perfectly normal behaviours. In a city like Dubai, where pets share parks and outdoor spaces, exposure is essentially unavoidable. Regular deworming breaks the cycle before damage sets in.",
      },
      {
        icon: "📉",
        title: "Silent Damage to Internal Organs",
        body:
          "Heavy worm burdens cause malnutrition, anaemia, liver damage, intestinal obstruction, and in severe cases, death — especially in puppies and kittens. Most infected pets show no obvious symptoms until the infestation is already advanced. A deworming schedule treats the problem before it becomes visible.",
      },
      {
        icon: "👨‍👩‍👧",
        title: "Some Worms Infect Humans",
        body:
          "Toxocara (roundworm) and Ancylostoma (hookworm) can infect people — particularly children who play in areas frequented by pets. Deworming your pet regularly is one of the most direct ways to protect your family's health, not just your animal's.",
      },
      {
        icon: "📅",
        title: "Simple, Affordable, and Fast",
        body:
          "Deworming is a straightforward treatment — typically a tablet or liquid dose given by mouth. The entire visit takes minutes. We'll recommend the right product and frequency based on your pet's age, weight, lifestyle, and risk factors. Most adult pets benefit from treatment every 3 months.",
      },
    ],
    faqs: [
      {
        q: "How often should I deworm my pet?",
        a: "For adult dogs and cats, every 3 months is the standard recommendation. Puppies and kittens need more frequent treatment, typically every 2 weeks from 2 weeks of age until 12 weeks, then monthly until 6 months old.",
      },
      {
        q: "What are the signs my pet might have worms?",
        a: "Symptoms include visible worms or segments in stool, pot-bellied appearance, weight loss despite good appetite, vomiting, diarrhoea, dull coat, and lethargy. Many pets have no obvious signs at all — which is why regular prevention matters.",
      },
      {
        q: "Is the treatment safe for my pet?",
        a: "Yes. Modern dewormers are highly effective and well-tolerated. We select the product based on your pet's species, weight, and age to ensure safety and correct dosing.",
      },
      {
        q: "Do indoor-only pets need deworming?",
        a: "Yes. Worm eggs can be tracked indoors on shoes and clothing. Even strictly indoor pets can be exposed, so regular prevention is still recommended.",
      },
    ],
  },

  {
    slug: "grooming",
    title: "Grooming",
    tagline: "Healthy skin, happy coat, calm pet",
    metaTitle: "Pet Grooming in JVC Dubai | Pet Friends Vet Clinic",
    metaDesc:
      "Professional grooming is more than looking good — it keeps your pet's skin, coat, ears, and nails healthy. Book a grooming session in JVC Dubai today.",
    heroHeadline: "Grooming Is Healthcare, Not Just Beauty",
    heroSub:
      "A clean, well-groomed pet is a healthier pet. Professional grooming sessions catch skin issues, parasite infestations, ear infections, and overgrown nails before they become serious problems.",
    whyHeading: "Why Professional Grooming Matters for Your Pet's Health",
    benefits: [
      {
        icon: "🧴",
        title: "Skin & Coat Health Detection",
        body:
          "During a grooming session, our trained groomers examine your pet's skin up close — something that's almost impossible to do at home through thick fur. They can spot early signs of hot spots, fungal infections, seborrhoea, excessive shedding, matting that traps moisture, or flea and tick infestations. Early detection means early treatment.",
      },
      {
        icon: "👂",
        title: "Ear Health and Infection Prevention",
        body:
          "Dogs with floppy ears — and many breeds with upright ears — are prone to ear infections due to moisture and wax build-up. Regular ear cleaning during grooming removes debris and allows groomers to flag early signs of infection. Left untreated, ear infections cause significant pain and can lead to hearing loss.",
      },
      {
        icon: "🐾",
        title: "Nail Overgrowth Is More Serious Than It Looks",
        body:
          "Nails that grow too long change the way a pet walks, putting abnormal pressure on joints. Over time, this causes pain, postural problems, and even arthritis. In extreme cases, overgrown nails curl and grow into the paw pad. Regular trimming is a simple step that protects your pet's long-term joint and mobility health.",
      },
      {
        icon: "😌",
        title: "We Specialise in Nervous Pets",
        body:
          "Many pets find grooming stressful — especially rescue animals or those with bad past experiences. Our groomers are trained in low-stress handling techniques. We work at your pet's pace, using gentle restraint and calm environments. A positive grooming experience now makes future visits much easier for everyone.",
      },
    ],
    faqs: [
      {
        q: "How often does my dog or cat need grooming?",
        a: "It depends on breed and coat type. Long-haired breeds typically need grooming every 6–8 weeks; short-haired breeds every 3–4 months for bath and nail trim. We'll advise on the right schedule for your specific pet.",
      },
      {
        q: "My pet is very anxious at the groomer. Can you still help?",
        a: "Absolutely. We have experience with anxious and reactive pets. We use low-stress techniques and take breaks as needed. Please mention any anxiety or past grooming issues when you book so we can prepare.",
      },
      {
        q: "What does a full grooming session include?",
        a: "A full groom typically includes bath, blow-dry, brushing, haircut or trim, ear cleaning, nail clipping, and gland expression if needed. We tailor services to your pet's needs.",
      },
      {
        q: "Do you groom cats?",
        a: "Yes. We groom cats with the calm, careful handling they require. Feline grooming sessions are kept quiet and unhurried.",
      },
    ],
  },

  {
    slug: "castration",
    title: "Spay / Neuter",
    tagline: "A lasting gift to your pet's health",
    metaTitle: "Spay & Neuter in JVC Dubai | Pet Friends Vet Clinic",
    metaDesc:
      "Spaying or neutering your pet prevents serious disease, reduces behavioural issues, and extends lifespan. Safe surgical care with full aftercare in JVC Dubai.",
    heroHeadline: "One Procedure. A Lifetime of Benefits.",
    heroSub:
      "Spaying or neutering is one of the most impactful health decisions you can make for your pet — backed by decades of veterinary evidence showing improved wellbeing and longer, healthier lives.",
    whyHeading: "Why Spaying or Neutering Is One of the Best Decisions for Your Pet",
    benefits: [
      {
        icon: "🎗️",
        title: "Dramatic Reduction in Cancer Risk",
        body:
          "Spaying female dogs before their first heat reduces the risk of mammary (breast) cancer to near zero — a cancer that is malignant in roughly 50% of dogs. It also eliminates the risk of pyometra, a life-threatening uterine infection that affects up to 25% of unspayed females. Neutering males virtually eliminates testicular cancer and reduces prostate problems.",
      },
      {
        icon: "🧠",
        title: "Calmer, More Focused Behaviour",
        body:
          "Hormones drive many difficult behaviours: roaming, aggression, marking territory, mounting, and the distress of seasonal heat cycles. Neutering significantly reduces or eliminates these behaviours in most animals, making your pet easier to live with and less likely to escape or injure themselves in pursuit of a mate.",
      },
      {
        icon: "📆",
        title: "When Is the Right Time?",
        body:
          "The timing of spay/neuter matters and varies by species, breed, and size. For most cats, 4–6 months is standard. For dogs, it depends on breed — small breeds can be done earlier, while large and giant breeds may benefit from waiting until 12–18 months. We will give you a personalised recommendation at your consultation.",
      },
      {
        icon: "🏥",
        title: "Safe Surgery with Full Aftercare",
        body:
          "These are routine procedures performed under general anaesthesia with full monitoring. Your pet will be given pain relief before and after, and we'll provide clear written aftercare instructions so you feel confident at home. We are always available to answer questions during recovery.",
      },
    ],
    faqs: [
      {
        q: "At what age should I spay or neuter my pet?",
        a: "For cats, the standard age is 4–6 months. For dogs, it varies by breed and size — we'll discuss the optimal timing at your consultation to ensure it aligns with your pet's development.",
      },
      {
        q: "Will my pet's personality change after the procedure?",
        a: "The core personality stays the same. What changes is hormonally driven behaviour — roaming, aggression, and heat cycles are reduced. Most owners notice a calmer, more settled pet.",
      },
      {
        q: "Is the surgery dangerous?",
        a: "Spay and neuter are among the most commonly performed veterinary surgeries. We use modern anaesthesia protocols, continuous monitoring, and post-operative pain management to minimise all risks.",
      },
      {
        q: "How long is recovery?",
        a: "Most pets are active and eating normally within 24–48 hours. Full internal healing takes about 10–14 days. We provide a recovery collar and detailed home care instructions.",
      },
    ],
  },

  {
    slug: "emergency",
    title: "Emergency Care",
    tagline: "Always here. No appointment needed.",
    metaTitle: "24/7 Emergency Vet in JVC Dubai | Pet Friends Vet Clinic",
    metaDesc:
      "Pet emergencies don't wait. Our 24/7 emergency vet team in JVC Dubai is ready for trauma, poisoning, breathing difficulties, and critical care — walk in any time.",
    heroHeadline: "When Every Minute Counts, We're Ready",
    heroSub:
      "Emergencies don't happen at convenient times. Our team is trained and equipped to handle critical situations at any hour — so that when the worst happens, you have somewhere to go.",
    whyHeading: "Why Fast Emergency Veterinary Care Is Critical",
    benefits: [
      {
        icon: "⏱️",
        title: "Time Is the Most Important Factor",
        body:
          "In a true emergency — airway obstruction, severe bleeding, suspected poisoning, anaphylaxis, or shock — every minute of delay increases the risk of death or permanent organ damage. Having a trusted 24/7 vet you can reach immediately is not just convenient; it can be the difference between life and death for your pet.",
      },
      {
        icon: "🚨",
        title: "Know the Signs That Require Emergency Care",
        body:
          "Difficulty breathing, collapse or inability to stand, continuous seizures, suspected ingestion of toxins, severe vomiting or diarrhoea with blood, eye injuries, suspected broken bones, and urinary blockage (especially in male cats) are all emergencies. When in doubt, come in. We'd always rather reassure you than have you wait.",
      },
      {
        icon: "🏥",
        title: "Equipped for Critical Cases",
        body:
          "Our emergency team has the diagnostics, medications, and surgical capability to stabilise and treat critical patients. We can take X-rays, run blood panels, administer IV fluids, and perform emergency surgery on site — without the delays of transferring your pet to a different facility.",
      },
      {
        icon: "🤲",
        title: "A Calm Team in a Frightening Moment",
        body:
          "We know that a pet emergency is one of the most stressful experiences an owner can face. Our team is trained not just in emergency medicine but in communicating clearly with owners who are scared and overwhelmed. You'll always know what's happening and why — from the moment you walk through the door.",
      },
    ],
    faqs: [
      {
        q: "Do I need an appointment for emergency care?",
        a: "No. Walk in any time, day or night. Our emergency team is always on standby and will see your pet immediately.",
      },
      {
        q: "What counts as a pet emergency?",
        a: "Breathing difficulties, collapse, seizures, suspected poisoning, severe bleeding, inability to urinate, trauma (hit by car, fall), pale gums, extreme distress, eye injuries, or loss of consciousness. When uncertain, call us or come in — it's always better to check.",
      },
      {
        q: "What should I do on the way to the clinic?",
        a: "Keep your pet as calm and still as possible. Don't try to treat wounds yourself unless there is severe bleeding that needs direct pressure. Call us on the way so we can prepare for your arrival.",
      },
      {
        q: "What are your emergency hours?",
        a: "We are available for emergencies 24 hours a day, 7 days a week with no exceptions. Our regular consultation hours are 12am–6am and 10am–12am daily.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return serviceDetails.find((s) => s.slug === slug);
}
