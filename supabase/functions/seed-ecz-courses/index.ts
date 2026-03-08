import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

const ECZ_COURSES = [
  {
    title: 'Mathematics Grade 12 – Complete ECZ Syllabus',
    description: 'Master the full Grade 12 Mathematics ECZ curriculum covering algebra, calculus, trigonometry, statistics and probability. Aligned with the Zambian Examination Council standards.',
    subject: 'Mathematics',
    grade_level: 'Grade 12',
    lessons: [
      { title: 'Algebra: Quadratic Equations & Functions', content: 'Solve quadratic equations using factorisation, completing the square, and the quadratic formula. Understand the discriminant and nature of roots.', video_url: 'https://www.youtube.com/watch?v=IWigZMaRO-Y', duration_minutes: 45 },
      { title: 'Indices and Logarithms', content: 'Laws of indices, logarithmic equations, change of base formula. ECZ past paper examples included.', video_url: 'https://www.youtube.com/watch?v=ntBWrcbAhaY', duration_minutes: 40 },
      { title: 'Sequences and Series', content: 'Arithmetic and geometric sequences, sum to n terms, convergence of geometric series, sigma notation.', video_url: 'https://www.youtube.com/watch?v=Tj89FA-d0f8', duration_minutes: 50 },
      { title: 'Differentiation – First Principles & Rules', content: 'Differentiation from first principles, power rule, chain rule, product and quotient rules with ECZ exam applications.', video_url: 'https://www.youtube.com/watch?v=WUvTyaaNkzM', duration_minutes: 55 },
      { title: 'Integration and Applications', content: 'Indefinite and definite integrals, area under curves, integration by substitution. Past paper worked examples.', video_url: 'https://www.youtube.com/watch?v=rfG8ce4nNh0', duration_minutes: 50 },
      { title: 'Trigonometry – Identities & Equations', content: 'Trigonometric identities, compound angle formulae, solving trigonometric equations within given ranges.', video_url: 'https://www.youtube.com/watch?v=yJFiMRMOv4E', duration_minutes: 45 },
      { title: 'Statistics and Probability', content: 'Mean, median, mode, standard deviation, probability laws, tree diagrams, conditional probability.', video_url: 'https://www.youtube.com/watch?v=XZo4xyJXCak', duration_minutes: 40 },
      { title: 'Matrices and Transformations', content: 'Matrix operations, inverse matrices, solving simultaneous equations using matrices, geometric transformations.', video_url: 'https://www.youtube.com/watch?v=kYB8IZa5AuE', duration_minutes: 45 },
    ]
  },
  {
    title: 'Biology Grade 12 – ECZ Exam Preparation',
    description: 'Comprehensive Biology course covering cell biology, genetics, ecology, human physiology and plant biology as per the ECZ Grade 12 syllabus.',
    subject: 'Biology',
    grade_level: 'Grade 12',
    lessons: [
      { title: 'Cell Structure and Organisation', content: 'Prokaryotic vs eukaryotic cells, organelles and their functions, cell membrane structure (fluid mosaic model).', video_url: 'https://www.youtube.com/watch?v=URUJD5NEXC8', duration_minutes: 40 },
      { title: 'Enzymes and Biological Molecules', content: 'Enzyme structure, lock and key model, factors affecting enzyme activity, carbohydrates, proteins, lipids.', video_url: 'https://www.youtube.com/watch?v=qgVFkRn8f10', duration_minutes: 45 },
      { title: 'DNA, Genes and Protein Synthesis', content: 'DNA structure, replication, transcription and translation. Gene expression and mutations.', video_url: 'https://www.youtube.com/watch?v=gG7uCskUOrA', duration_minutes: 50 },
      { title: 'Genetics and Inheritance', content: 'Mendelian genetics, monohybrid and dihybrid crosses, co-dominance, sex-linked inheritance, pedigree analysis.', video_url: 'https://www.youtube.com/watch?v=Mehz7tCxjSE', duration_minutes: 50 },
      { title: 'Human Circulatory System', content: 'Heart structure and function, blood vessels, blood composition, cardiac cycle, ECG interpretation.', video_url: 'https://www.youtube.com/watch?v=CWFyxn0qDEU', duration_minutes: 45 },
      { title: 'Respiration – Aerobic and Anaerobic', content: 'Glycolysis, Krebs cycle, oxidative phosphorylation, anaerobic respiration in yeast and muscles.', video_url: 'https://www.youtube.com/watch?v=eJ9Zjc-jdys', duration_minutes: 45 },
      { title: 'Ecology and Ecosystems', content: 'Food webs, energy flow, nutrient cycling, population dynamics, human impact on the environment.', video_url: 'https://www.youtube.com/watch?v=GlPD5mCfpV4', duration_minutes: 40 },
    ]
  },
  {
    title: 'Physics Grade 12 – ECZ Complete Course',
    description: 'Full Grade 12 Physics covering mechanics, waves, electricity, magnetism and modern physics. Includes ECZ past paper solutions.',
    subject: 'Physics',
    grade_level: 'Grade 12',
    lessons: [
      { title: 'Kinematics – Motion in One Dimension', content: 'Displacement, velocity, acceleration, equations of motion, free fall and projectile motion.', video_url: 'https://www.youtube.com/watch?v=ZM8ECpBuQYE', duration_minutes: 45 },
      { title: 'Newton\'s Laws of Motion', content: 'First, second and third laws, free body diagrams, friction, inclined planes, connected bodies.', video_url: 'https://www.youtube.com/watch?v=kKKM8Y-u7ds', duration_minutes: 50 },
      { title: 'Work, Energy and Power', content: 'Work done, kinetic and potential energy, conservation of energy, power and efficiency.', video_url: 'https://www.youtube.com/watch?v=w4QFJb9a8vo', duration_minutes: 40 },
      { title: 'Waves – Properties and Behaviour', content: 'Transverse and longitudinal waves, reflection, refraction, diffraction, interference, standing waves.', video_url: 'https://www.youtube.com/watch?v=TfYCnOvNnFU', duration_minutes: 45 },
      { title: 'Current Electricity', content: 'Ohm\'s law, series and parallel circuits, Kirchhoff\'s laws, internal resistance, potentiometers.', video_url: 'https://www.youtube.com/watch?v=VnnpLaKsqGU', duration_minutes: 50 },
      { title: 'Electromagnetic Induction', content: 'Faraday\'s law, Lenz\'s law, AC generators, transformers, mutual and self-inductance.', video_url: 'https://www.youtube.com/watch?v=mRHPHxKbsNI', duration_minutes: 45 },
      { title: 'Nuclear Physics and Radioactivity', content: 'Atomic structure, radioactive decay, half-life, nuclear fission and fusion, mass-energy equivalence.', video_url: 'https://www.youtube.com/watch?v=lUhJL7o6_cA', duration_minutes: 40 },
    ]
  },
  {
    title: 'Chemistry Grade 12 – ECZ Syllabus',
    description: 'Complete ECZ Chemistry covering atomic structure, chemical bonding, organic chemistry, electrochemistry and reaction kinetics.',
    subject: 'Chemistry',
    grade_level: 'Grade 12',
    lessons: [
      { title: 'Atomic Structure and Periodicity', content: 'Electron configuration, periodic trends (ionisation energy, electronegativity, atomic radius), s/p/d block elements.', video_url: 'https://www.youtube.com/watch?v=HTh_5VEBnJo', duration_minutes: 45 },
      { title: 'Chemical Bonding and Structure', content: 'Ionic, covalent and metallic bonding, shapes of molecules (VSEPR theory), intermolecular forces.', video_url: 'https://www.youtube.com/watch?v=Pij930zfTJg', duration_minutes: 50 },
      { title: 'Stoichiometry and the Mole Concept', content: 'Mole calculations, empirical and molecular formulae, limiting reagents, percentage yield.', video_url: 'https://www.youtube.com/watch?v=AsqEkF7hcII', duration_minutes: 40 },
      { title: 'Organic Chemistry – Hydrocarbons', content: 'Alkanes, alkenes, alkynes, naming conventions, isomerism, reactions of hydrocarbons.', video_url: 'https://www.youtube.com/watch?v=bka20Q9TN6M', duration_minutes: 50 },
      { title: 'Organic Chemistry – Functional Groups', content: 'Alcohols, aldehydes, ketones, carboxylic acids, esters, amines. Reaction mechanisms.', video_url: 'https://www.youtube.com/watch?v=BrekFTIfCkg', duration_minutes: 55 },
      { title: 'Electrochemistry', content: 'Electrolysis, electrochemical cells, electrode potentials, Faraday\'s laws, applications.', video_url: 'https://www.youtube.com/watch?v=Ge7Oy22C3dI', duration_minutes: 45 },
      { title: 'Rates of Reaction and Equilibrium', content: 'Factors affecting rate, rate equations, Le Chatelier\'s principle, equilibrium constants (Kc, Kp).', video_url: 'https://www.youtube.com/watch?v=f6aFGFJPhLw', duration_minutes: 45 },
    ]
  },
  {
    title: 'English Language Grade 9 – ECZ Aligned',
    description: 'Develop reading comprehension, essay writing, grammar and oral communication skills aligned with the ECZ Grade 9 curriculum.',
    subject: 'English',
    grade_level: 'Grade 9',
    lessons: [
      { title: 'Reading Comprehension Strategies', content: 'Skimming, scanning, inference, main idea identification. Practice with ECZ-style passages.', video_url: 'https://www.youtube.com/watch?v=WMiLyFcfEjU', duration_minutes: 35 },
      { title: 'Essay Writing – Narrative and Descriptive', content: 'Structure of narrative essays, descriptive techniques, creating vivid imagery, planning and drafting.', video_url: 'https://www.youtube.com/watch?v=S5HnFdVbcqA', duration_minutes: 40 },
      { title: 'Grammar – Tenses and Sentence Structure', content: 'Past, present, future tenses, complex sentences, subordinate clauses, reported speech.', video_url: 'https://www.youtube.com/watch?v=xt_ZYNPFOsQ', duration_minutes: 35 },
      { title: 'Summary Writing Skills', content: 'Identifying key points, paraphrasing, word limits, ECZ summary format and marking criteria.', video_url: 'https://www.youtube.com/watch?v=eGWO1ldEhtQ', duration_minutes: 30 },
      { title: 'Letter Writing – Formal and Informal', content: 'Format of formal letters, tone and register, informal letter conventions, applications and complaints.', video_url: 'https://www.youtube.com/watch?v=MxI9YF-jLss', duration_minutes: 35 },
    ]
  },
  {
    title: 'Science Grade 9 – ECZ Junior Secondary',
    description: 'Integrated Science for Grade 9 covering biology, chemistry and physics fundamentals as per the Zambian junior secondary curriculum.',
    subject: 'Science',
    grade_level: 'Grade 9',
    lessons: [
      { title: 'Introduction to Cells and Microscopy', content: 'Using a microscope, plant and animal cells, cell organelles, preparing slides.', video_url: 'https://www.youtube.com/watch?v=URUJD5NEXC8', duration_minutes: 35 },
      { title: 'States of Matter and Changes', content: 'Solids, liquids, gases, melting, boiling, evaporation, condensation, particle theory.', video_url: 'https://www.youtube.com/watch?v=s-KvoVzukHo', duration_minutes: 30 },
      { title: 'Forces and Motion Basics', content: 'Types of forces, balanced and unbalanced forces, speed calculations, distance-time graphs.', video_url: 'https://www.youtube.com/watch?v=ZM8ECpBuQYE', duration_minutes: 35 },
      { title: 'Chemical Reactions and Equations', content: 'Signs of chemical reactions, word equations, balancing symbol equations, types of reactions.', video_url: 'https://www.youtube.com/watch?v=eNsVaUCzvLA', duration_minutes: 40 },
      { title: 'The Human Digestive System', content: 'Organs of digestion, enzymes, absorption in the small intestine, healthy diet and nutrition.', video_url: 'https://www.youtube.com/watch?v=Og5xAdC8EUI', duration_minutes: 35 },
      { title: 'Electricity and Circuits', content: 'Current, voltage, resistance, series and parallel circuits, circuit diagrams, safety with electricity.', video_url: 'https://www.youtube.com/watch?v=VnnpLaKsqGU', duration_minutes: 40 },
    ]
  },
  {
    title: 'Civic Education Grade 12 – ECZ',
    description: 'Understanding Zambian governance, human rights, democracy and civic responsibilities. Essential for ECZ Grade 12 examinations.',
    subject: 'Civic Education',
    grade_level: 'Grade 12',
    lessons: [
      { title: 'The Zambian Constitution', content: 'History of constitutional development in Zambia, Bill of Rights, fundamental freedoms, constitutional amendments.', video_url: 'https://www.youtube.com/watch?v=yjR9FmgYrIw', duration_minutes: 40 },
      { title: 'Democracy and Governance', content: 'Principles of democracy, types of government, separation of powers, the role of Parliament, judiciary and executive.', video_url: 'https://www.youtube.com/watch?v=PKnGnMR8V4Y', duration_minutes: 45 },
      { title: 'Human Rights and Responsibilities', content: 'Universal Declaration of Human Rights, rights vs responsibilities, human rights organisations, contemporary issues.', video_url: 'https://www.youtube.com/watch?v=nDgIVseTkuE', duration_minutes: 35 },
      { title: 'Electoral Process in Zambia', content: 'Electoral Commission of Zambia, voter registration, types of elections, campaign ethics, peaceful transitions.', video_url: 'https://www.youtube.com/watch?v=Yx-mkc4cr0c', duration_minutes: 40 },
      { title: 'National Values and Principles', content: 'Zambian national values, patriotism, national symbols, unity in diversity, national development.', video_url: 'https://www.youtube.com/watch?v=2yZ8gquGqU4', duration_minutes: 30 },
    ]
  },
  {
    title: 'Computer Studies Grade 12 – ECZ',
    description: 'Covering computer hardware, software, programming basics, databases and ICT applications per the ECZ syllabus.',
    subject: 'Computer Studies',
    grade_level: 'Grade 12',
    lessons: [
      { title: 'Computer Hardware Components', content: 'CPU, RAM, storage devices, input/output devices, motherboard architecture, system specifications.', video_url: 'https://www.youtube.com/watch?v=HB4I2CgkcCo', duration_minutes: 40 },
      { title: 'Operating Systems and Software', content: 'Types of OS (Windows, Linux), system software vs application software, file management, utility programs.', video_url: 'https://www.youtube.com/watch?v=26QPDBe-NB8', duration_minutes: 35 },
      { title: 'Introduction to Programming', content: 'Algorithms, flowcharts, pseudocode, variables, data types, control structures (IF, WHILE, FOR).', video_url: 'https://www.youtube.com/watch?v=zOjov-2OZ0E', duration_minutes: 50 },
      { title: 'Database Concepts', content: 'Database design, tables, fields, records, primary keys, SQL basics, data integrity and security.', video_url: 'https://www.youtube.com/watch?v=wR0jg0eQsZA', duration_minutes: 45 },
      { title: 'Networking and the Internet', content: 'Network types (LAN, WAN), topologies, protocols, internet services, cybersecurity awareness.', video_url: 'https://www.youtube.com/watch?v=3QhU9jd03a0', duration_minutes: 40 },
      { title: 'Spreadsheets and Data Processing', content: 'Excel functions (SUM, AVERAGE, IF, VLOOKUP), charts, data analysis, practical ECZ exam tasks.', video_url: 'https://www.youtube.com/watch?v=rwbho0CgEAE', duration_minutes: 45 },
    ]
  },
  {
    title: 'Geography Grade 12 – ECZ Syllabus',
    description: 'Physical and human geography covering weather, climate, geomorphology, population and economic development for ECZ Grade 12.',
    subject: 'Geography',
    grade_level: 'Grade 12',
    lessons: [
      { title: 'Weather and Climate', content: 'Elements and factors of weather, climate zones, pressure systems, rainfall types, Zambian climate patterns.', video_url: 'https://www.youtube.com/watch?v=vH298zSCQzY', duration_minutes: 45 },
      { title: 'Plate Tectonics and Earthquakes', content: 'Continental drift, plate boundaries, earthquakes, volcanoes, fold mountains, the East African Rift.', video_url: 'https://www.youtube.com/watch?v=kwfNGatxUJI', duration_minutes: 40 },
      { title: 'Rivers and Fluvial Processes', content: 'River erosion, transportation and deposition, waterfall formation, meanders, oxbow lakes, flood management.', video_url: 'https://www.youtube.com/watch?v=UOEYuzMf2xo', duration_minutes: 40 },
      { title: 'Population Studies', content: 'Population growth, demographic transition model, population pyramids, migration, urbanisation in Zambia.', video_url: 'https://www.youtube.com/watch?v=E8MzFuAiJ-o', duration_minutes: 35 },
      { title: 'Agriculture and Food Production', content: 'Types of farming, subsistence vs commercial, agricultural challenges in Zambia, food security.', video_url: 'https://www.youtube.com/watch?v=Qmla9NLFBvU', duration_minutes: 40 },
      { title: 'Map Work and GIS', content: 'Grid references, contour lines, cross-sections, scale calculations, topographic map interpretation.', video_url: 'https://www.youtube.com/watch?v=mBBMOPKl-cg', duration_minutes: 45 },
    ]
  },
  {
    title: 'Mathematics Grade 9 – ECZ Junior Secondary',
    description: 'Foundation mathematics for Grade 9 covering number systems, algebra, geometry, statistics and measurement aligned with ECZ standards.',
    subject: 'Mathematics',
    grade_level: 'Grade 9',
    lessons: [
      { title: 'Number Systems and Operations', content: 'Integers, fractions, decimals, percentages, ratio and proportion, BODMAS/BIDMAS.', video_url: 'https://www.youtube.com/watch?v=8mhPxWbQg_M', duration_minutes: 35 },
      { title: 'Basic Algebra', content: 'Simplifying expressions, solving linear equations, substitution, expanding brackets, factorising.', video_url: 'https://www.youtube.com/watch?v=IWigZMaRO-Y', duration_minutes: 40 },
      { title: 'Geometry – Angles and Shapes', content: 'Angle properties, parallel lines, triangles, quadrilaterals, circle theorems basics.', video_url: 'https://www.youtube.com/watch?v=mLeNaj2A5ng', duration_minutes: 35 },
      { title: 'Measurement – Area and Volume', content: 'Area of 2D shapes, surface area and volume of prisms, cylinders, practical applications.', video_url: 'https://www.youtube.com/watch?v=gL3HxBQyeg0', duration_minutes: 40 },
      { title: 'Data Handling and Statistics', content: 'Collecting data, frequency tables, bar charts, pie charts, mean/median/mode, probability basics.', video_url: 'https://www.youtube.com/watch?v=XZo4xyJXCak', duration_minutes: 35 },
      { title: 'Coordinate Geometry', content: 'Plotting points, gradients, equation of a line, distance between points, midpoint formula.', video_url: 'https://www.youtube.com/watch?v=5A0kjRAMIfI', duration_minutes: 40 },
    ]
  },
]

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Get user from auth header
    const authClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )
    const { data: { user }, error: authError } = await authClient.auth.getUser()
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    // Check if courses already seeded (by checking for a specific title)
    const { data: existing } = await supabaseClient
      .from('courses')
      .select('id')
      .eq('title', ECZ_COURSES[0].title)
      .limit(1)

    if (existing && existing.length > 0) {
      return new Response(JSON.stringify({ message: 'ECZ courses already seeded', count: 0 }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    let totalCourses = 0
    let totalLessons = 0

    for (const courseData of ECZ_COURSES) {
      const { data: course, error: courseError } = await supabaseClient
        .from('courses')
        .insert({
          title: courseData.title,
          description: courseData.description,
          subject: courseData.subject,
          grade_level: courseData.grade_level,
          created_by: user.id,
          is_published: true,
        })
        .select('id')
        .single()

      if (courseError || !course) {
        console.error('Error creating course:', courseData.title, courseError)
        continue
      }

      totalCourses++

      const lessonsToInsert = courseData.lessons.map((lesson, index) => ({
        course_id: course.id,
        title: lesson.title,
        content: lesson.content,
        video_url: lesson.video_url,
        duration_minutes: lesson.duration_minutes,
        order_index: index,
      }))

      const { error: lessonsError } = await supabaseClient
        .from('lessons')
        .insert(lessonsToInsert)

      if (lessonsError) {
        console.error('Error creating lessons for:', courseData.title, lessonsError)
      } else {
        totalLessons += lessonsToInsert.length
      }
    }

    return new Response(
      JSON.stringify({ message: `Seeded ${totalCourses} ECZ courses with ${totalLessons} lessons`, count: totalCourses }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in seed-ecz-courses:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
