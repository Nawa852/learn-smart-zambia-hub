import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

interface Material {
  title: string;
  url: string;
  type: 'notes' | 'past_paper';
  year?: string;
  paper?: string;
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
    ],
    materials: [
      // Notes
      { title: 'Grade 10-12 Pamphlet - Understanding Principles of Mathematics', url: 'https://drive.google.com/uc?export=download&id=1J8z1j_Zc6TYAK_x-CfzDW9t9ZCOXm-0t', type: 'notes' as const },
      { title: 'Grade 10-12 Maths Study Material & Exam Questions', url: 'https://drive.google.com/uc?export=download&id=1mo1ffXpeMt-pxnfAaxPsUVRy-QYG3w6K', type: 'notes' as const },
      { title: 'Grade 10-12 Maths Notes with Exam Questions & Answers', url: 'https://drive.google.com/uc?export=download&id=1p0wnyR44KxPW0YR5lg5rRRKPAu9Ofyei', type: 'notes' as const },
      { title: 'Grade 10-12 Mathematics (Basics)', url: 'https://drive.google.com/uc?export=download&id=18ufjtgABaE5lhyB9zCJ-C1pvJpxCNRYE', type: 'notes' as const },
      { title: 'Grade 10-12 Mathematics Pamphlet (QnA)', url: 'https://drive.google.com/uc?export=download&id=16gLviR20axrR9zFPIXp4gsf0rtb-7Lid', type: 'notes' as const },
      { title: 'Grade 10-12 Mathematics Revision Pamphlet Vol.1', url: 'https://drive.google.com/uc?export=download&id=1B8xzMsbS7pNQ2t03pop8a3V_fQQVk4Rh', type: 'notes' as const },
      { title: 'Grade 12 Math Pamphlet', url: 'https://drive.google.com/uc?export=download&id=1D5q_1kX1anTobTbSrfpiw-r3bEi7ewo1', type: 'notes' as const },
      { title: 'Quick Revision for Major Topics in Maths Paper 1', url: 'https://drive.google.com/uc?export=download&id=1qT9QXKaKgrW5KqXwIYsaeIHpTW90L_15', type: 'notes' as const },
      { title: 'KDC Exam Questions and Answers (2014-2017)', url: 'https://drive.google.com/uc?export=download&id=1MmWOcVQfd5AoidPUnW1K5D9jck2FKa9A', type: 'notes' as const },
      { title: 'KDC Exam Questions and Answers (2016-2018)', url: 'https://drive.google.com/uc?export=download&id=1rEvCUfp3YzNP7UTir-7KV72Ybs2i5se7', type: 'notes' as const },
      // Past Papers
      { title: 'ECZ Mathematics Paper 2 2024', url: 'https://drive.google.com/uc?export=download&id=1lPGj6KTd84khlbkjymiTJCAr_QI7YhKm', type: 'past_paper' as const, year: '2024', paper: 'Paper 2' },
      { title: 'ECZ Mathematics Paper 2 2023', url: 'https://drive.google.com/uc?export=download&id=1hzgjk6Cb93zrGqq5rBL2QAG1cXFGPrfT', type: 'past_paper' as const, year: '2023', paper: 'Paper 2' },
      { title: 'ECZ Mathematics Paper 2 2023 GCE', url: 'https://drive.google.com/uc?export=download&id=1YiSRB_wuZWYwKPuDc-q8vAR_Vac5GnFD', type: 'past_paper' as const, year: '2023', paper: 'Paper 2 GCE' },
      { title: 'ECZ Mathematics Paper 2 2022', url: 'https://drive.google.com/uc?export=download&id=15Pxv8MrQE4vUXVm1u17me0_k83xQ6jb0', type: 'past_paper' as const, year: '2022', paper: 'Paper 2' },
      { title: 'ECZ Mathematics Paper 2 2022 GCE', url: 'https://drive.google.com/uc?export=download&id=14GjwtssRVar_YwMVlQnBNs1_dLUs7ruU', type: 'past_paper' as const, year: '2022', paper: 'Paper 2 GCE' },
      { title: 'ECZ Mathematics Paper 1 2021', url: 'https://drive.google.com/uc?export=download&id=1zifoyTQyZf4hdfoNfEma6wukn50nxMrp', type: 'past_paper' as const, year: '2021', paper: 'Paper 1' },
      { title: 'ECZ Mathematics Paper 2 2021', url: 'https://drive.google.com/uc?export=download&id=1XQ9HEa884ghr8t-f3k46eo8aYjOqpfHO', type: 'past_paper' as const, year: '2021', paper: 'Paper 2' },
      { title: 'ECZ Mathematics Paper 2 2021 GCE', url: 'https://drive.google.com/uc?export=download&id=1xK6-_dew7odvFHGnaG5Pzu_UAiInZf9F', type: 'past_paper' as const, year: '2021', paper: 'Paper 2 GCE' },
      { title: 'ECZ Mathematics Paper 2 2020', url: 'https://drive.google.com/uc?export=download&id=1FJZiLnhwCP6Nfcam6-36xqbgRDJL-KaE', type: 'past_paper' as const, year: '2020', paper: 'Paper 2' },
      { title: 'ECZ Mathematics Paper 2 2020 GCE', url: 'https://drive.google.com/uc?export=download&id=1ALlfmbomV9OZB334rNx2Jvh9CWVGxrLN', type: 'past_paper' as const, year: '2020', paper: 'Paper 2 GCE' },
      { title: 'ECZ Mathematics Paper 1 2020 GCE', url: 'https://drive.google.com/uc?export=download&id=1LQ4zglP9rFgzgjjK5dkMXxQBMS8yG-ZL', type: 'past_paper' as const, year: '2020', paper: 'Paper 1 GCE' },
      { title: 'ECZ Mathematics Paper 2 2019', url: 'https://drive.google.com/uc?export=download&id=1Cx9xF9VytL97YmmItwaucxD2DOsdSztU', type: 'past_paper' as const, year: '2019', paper: 'Paper 2' },
      { title: 'ECZ Mathematics Paper 2 2019 GCE', url: 'https://drive.google.com/uc?export=download&id=1wVjbdN9fztrjxhONGRX5U6N1OJDAChOi', type: 'past_paper' as const, year: '2019', paper: 'Paper 2 GCE' },
      { title: 'ECZ Mathematics Paper 1 2019', url: 'https://drive.google.com/uc?export=download&id=1x_9E3PaviCuSsqfJqOsQKOwVlCWZ1jqf', type: 'past_paper' as const, year: '2019', paper: 'Paper 1' },
      { title: 'ECZ Mathematics Paper 2 2018 GCE', url: 'https://drive.google.com/uc?export=download&id=1Nz26kYb6ucf7RleYO7RS9YSvfT39YbfE', type: 'past_paper' as const, year: '2018', paper: 'Paper 2 GCE' },
      { title: 'ECZ Mathematics Paper 1 2018 GCE', url: 'https://drive.google.com/uc?export=download&id=1rVoE67huGYYP3OsXo7EI0PaKwVQe14eR', type: 'past_paper' as const, year: '2018', paper: 'Paper 1 GCE' },
      { title: 'ECZ Mathematics Paper 2 2017', url: 'https://drive.google.com/uc?export=download&id=17VfByW2qU735eLnjTu4RCNLtnwGbdEKI', type: 'past_paper' as const, year: '2017', paper: 'Paper 2' },
      { title: 'ECZ Mathematics Paper 1 2017', url: 'https://drive.google.com/uc?export=download&id=1r8kY7nvn7kiectHad3DAJvUdUk_nYB4T', type: 'past_paper' as const, year: '2017', paper: 'Paper 1' },
      { title: 'ECZ Mathematics Paper 2 2017 GCE', url: 'https://drive.google.com/uc?export=download&id=1kFjJqFR_YM3l_rCkVBxq3K-h9uoc9UiO', type: 'past_paper' as const, year: '2017', paper: 'Paper 2 GCE' },
      { title: 'ECZ Mathematics Paper 1 2017 GCE', url: 'https://drive.google.com/uc?export=download&id=1m0XgdP5omvVuM2LKROuPPo3NswnucJ5L', type: 'past_paper' as const, year: '2017', paper: 'Paper 1 GCE' },
      { title: 'ECZ Mathematics Paper 2 2016', url: 'https://drive.google.com/uc?export=download&id=1yC5X21py5mIgfMCTGDtNUxeGeBqwzyPn', type: 'past_paper' as const, year: '2016', paper: 'Paper 2' },
      { title: 'ECZ Mathematics Paper 1 2016', url: 'https://drive.google.com/uc?export=download&id=10YeP8WsBNsHNCJj9l06wCFrsaoBGQyUN', type: 'past_paper' as const, year: '2016', paper: 'Paper 1' },
      { title: 'ECZ Mathematics Paper 2 2015', url: 'https://drive.google.com/uc?export=download&id=1bpLR5UCF6beRnCbC51zkVdpr00Y-7y73', type: 'past_paper' as const, year: '2015', paper: 'Paper 2' },
      { title: 'ECZ Mathematics Paper 1 2015', url: 'https://drive.google.com/uc?export=download&id=10hQNODqs_XAd4KpjlO2k_y4dA73zfHlK', type: 'past_paper' as const, year: '2015', paper: 'Paper 1' },
      { title: 'ECZ Mathematics Paper 2 2014', url: 'https://drive.google.com/uc?export=download&id=1buPq6annv__wSrCOT1ZWVEbmeV3n-DXu', type: 'past_paper' as const, year: '2014', paper: 'Paper 2' },
      { title: 'ECZ Mathematics Paper 1 2014', url: 'https://drive.google.com/uc?export=download&id=1GX7jjURIuZ7Bij74ODdzHCmZvd76we-q', type: 'past_paper' as const, year: '2014', paper: 'Paper 1' },
      { title: 'ECZ Mathematics Paper 2 2013', url: 'https://drive.google.com/uc?export=download&id=1lZD8gYYTDsiPb34X7aYjFju1WJC_fzNH', type: 'past_paper' as const, year: '2013', paper: 'Paper 2' },
      { title: 'ECZ Mathematics Paper 1 2013', url: 'https://drive.google.com/uc?export=download&id=15ba4_7atS9Tp7dbqoqVIRwGlVrwft9aG', type: 'past_paper' as const, year: '2013', paper: 'Paper 1' },
      { title: 'ECZ Mathematics Paper 2 2012', url: 'https://drive.google.com/uc?export=download&id=1MkTZssWKxeFJhMgAJlX6PSE5r-jhl4mz', type: 'past_paper' as const, year: '2012', paper: 'Paper 2' },
      { title: 'ECZ Mathematics Paper 1 2012', url: 'https://drive.google.com/uc?export=download&id=1Akv-ikzyLlf5liLMYoXY53_DdTJUgMXj', type: 'past_paper' as const, year: '2012', paper: 'Paper 1' },
      { title: 'ECZ Mathematics Paper 2 2011', url: 'https://drive.google.com/uc?export=download&id=1KXy9B4zGqTJSMMi4PC1cJV5eBcd5bNNN', type: 'past_paper' as const, year: '2011', paper: 'Paper 2' },
      { title: 'ECZ Mathematics Paper 1 2011', url: 'https://drive.google.com/uc?export=download&id=1doxOvyi2Y-bJTrofEqzD8aF6nb7Qu8uC', type: 'past_paper' as const, year: '2011', paper: 'Paper 1' },
      { title: 'ECZ Mathematics Paper 2 2010', url: 'https://drive.google.com/uc?export=download&id=12lT5M92PW7z8G1Pghe-a6hhXtZeNblm9', type: 'past_paper' as const, year: '2010', paper: 'Paper 2' },
      { title: 'ECZ Mathematics Paper 1 2010', url: 'https://drive.google.com/uc?export=download&id=10hhUetS8gjMPChfmo-WYlXmsCkess6lH', type: 'past_paper' as const, year: '2010', paper: 'Paper 1' },
      { title: 'ECZ Mathematics Paper 2 2009', url: 'https://drive.google.com/uc?export=download&id=1Ma0KFm1yR9bHsCFELa_ulhAWs28tWCk4', type: 'past_paper' as const, year: '2009', paper: 'Paper 2' },
      { title: 'ECZ Mathematics Paper 1 2009', url: 'https://drive.google.com/uc?export=download&id=1JTJkDvKHYKAhSppfp1OiW-2O-MN6GHZt', type: 'past_paper' as const, year: '2009', paper: 'Paper 1' },
    ],
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
    ],
    materials: [
      // Notes
      { title: 'Biology O Level Questions and Answers', url: 'https://drive.google.com/uc?export=download&id=16meXd3hdBxDHk7C7L-ax61RnwVaBuorH', type: 'notes' as const },
      { title: 'Biology Notes Grade 10', url: 'https://drive.google.com/uc?export=download&id=1hL63hybtfyP6PQSDG4XOewmgT1jVywY5', type: 'notes' as const },
      { title: 'Biology Notes Grade 11', url: 'https://drive.google.com/uc?export=download&id=1r0DJCNpqQ4y5hCP7CceLc6mTeIoYmGyz', type: 'notes' as const },
      { title: 'Grade 10-12 General Biology Notes', url: 'https://drive.google.com/uc?export=download&id=1MlEEqN-BGGVWFHt4QOMd_zdInucZ6zZ0', type: 'notes' as const },
      { title: 'Grade 10-12 Biology Pamphlet - Simplified Notes', url: 'https://drive.google.com/uc?export=download&id=1uYrDaB68evSxiu88nGkzjDo7L6sdbV1D', type: 'notes' as const },
      { title: 'Grade 10-12 Biology Revision Book', url: 'https://drive.google.com/uc?export=download&id=1k8hPj7CK1fd2O81KOLDbI4iif-6E7H-a', type: 'notes' as const },
      { title: 'Grade 10-12 Biology Summarised Notes', url: 'https://drive.google.com/uc?export=download&id=16Z02ZihWvvclEab5dwVLNU4jVU4FTigK', type: 'notes' as const },
      { title: 'Guide to Practicals in Biology', url: 'https://drive.google.com/uc?export=download&id=1CkzmgsUkgxrpngTQ-jEPyzMchRZwoqN8', type: 'notes' as const },
      { title: 'Biology Notes - Excretion', url: 'https://drive.google.com/uc?export=download&id=1nIV-Dj6uDV2uw9IVX0xHLpWoUsquUMry', type: 'notes' as const },
      { title: 'Biology Notes - Respiration', url: 'https://drive.google.com/uc?export=download&id=1jHszKtbDuL4vKOSg4zvakOl1jWnEOHZi', type: 'notes' as const },
      { title: 'Biology Notes - Reproduction', url: 'https://drive.google.com/uc?export=download&id=1YvkgrLeZM2Lcxn_RmSkzApWQFODKWfKI', type: 'notes' as const },
      { title: 'Topical Revision Notes Biology O Level', url: 'https://drive.google.com/uc?export=download&id=1J-RV-8gExsw_MbdkwxOf2q2R86x0LcT8', type: 'notes' as const },
      // Past Papers
      { title: 'ECZ Biology Paper 2 2024', url: 'https://drive.google.com/uc?export=download&id=1JkcKvKFc_Fm6iZrqWLvHpwk3PdExhZ-t', type: 'past_paper' as const, year: '2024', paper: 'Paper 2' },
      { title: 'ECZ Biology Paper 1 2024', url: 'https://drive.google.com/uc?export=download&id=1zqYE3K5hMbV8MfKAGbKg61JSygEiF-GP', type: 'past_paper' as const, year: '2024', paper: 'Paper 1' },
      { title: 'ECZ Biology Paper 2 2023', url: 'https://drive.google.com/uc?export=download&id=13Mgo3VtYcwKhOQ_7j5L7p5koWXNqoprT', type: 'past_paper' as const, year: '2023', paper: 'Paper 2' },
      { title: 'ECZ Biology Paper 1 2023', url: 'https://drive.google.com/uc?export=download&id=1ICPRGEAyBVjMZo4PhO_An1hh1_IN1NR9', type: 'past_paper' as const, year: '2023', paper: 'Paper 1' },
      { title: 'ECZ Biology Paper 2 2022', url: 'https://drive.google.com/uc?export=download&id=1kIouecpRaMzJ2CkrnkDoZ95xsUQZEPra', type: 'past_paper' as const, year: '2022', paper: 'Paper 2' },
      { title: 'ECZ Biology Paper 1 2022', url: 'https://drive.google.com/uc?export=download&id=17jjjOsIw-JZY_COW0abdxwmuLPsJDMLg', type: 'past_paper' as const, year: '2022', paper: 'Paper 1' },
      { title: 'ECZ Biology Paper 2 2021', url: 'https://drive.google.com/uc?export=download&id=15Rw53DUx8qSqw-e79Rgna42kwZZsBJWi', type: 'past_paper' as const, year: '2021', paper: 'Paper 2' },
      { title: 'ECZ Biology Paper 1 2021', url: 'https://drive.google.com/uc?export=download&id=1i-t2Hrx0SzfxpBeqIGEJMvMo7z30ttPe', type: 'past_paper' as const, year: '2021', paper: 'Paper 1' },
      { title: 'ECZ Biology Paper 1 2020', url: 'https://drive.google.com/uc?export=download&id=1fA_hcMPeOwGpM-BXyWQuyoyTSEvQfdot', type: 'past_paper' as const, year: '2020', paper: 'Paper 1' },
      { title: 'ECZ Biology Paper 1 2019', url: 'https://drive.google.com/uc?export=download&id=1xFtZudGGbN5zpa_RlHxTSWa4FswDJbmu', type: 'past_paper' as const, year: '2019', paper: 'Paper 1' },
      { title: 'ECZ Biology Paper 2 2019', url: 'https://drive.google.com/uc?export=download&id=1yqYWLC4-8NxfmLsDM2_BGfMJ2n5JCWs6', type: 'past_paper' as const, year: '2019', paper: 'Paper 2' },
      { title: 'ECZ Biology Paper 1 2018', url: 'https://drive.google.com/uc?export=download&id=1MjtZ4oQYIanviAg29TNSEtB2vYPebIFo', type: 'past_paper' as const, year: '2018', paper: 'Paper 1' },
      { title: 'ECZ Biology Paper 1 2017', url: 'https://drive.google.com/uc?export=download&id=1dxSooQEXGVgLapa9i30FMPZqevtqg5MX', type: 'past_paper' as const, year: '2017', paper: 'Paper 1' },
      { title: 'ECZ Biology Paper 2 2017', url: 'https://drive.google.com/uc?export=download&id=1UpuS8_Yhw3QlMZrmHvae3w_nAkRNoW1u', type: 'past_paper' as const, year: '2017', paper: 'Paper 2' },
      { title: 'ECZ Biology Paper 3 2017', url: 'https://drive.google.com/uc?export=download&id=1aKRfrmzX3fNu9JNICZJY9W3OVEgiWc5U', type: 'past_paper' as const, year: '2017', paper: 'Paper 3' },
      { title: 'ECZ Biology Paper 1 2016', url: 'https://drive.google.com/uc?export=download&id=1NbCCatCNVQP8qlZBi6uUovqdBmW_KGgC', type: 'past_paper' as const, year: '2016', paper: 'Paper 1' },
      { title: 'ECZ Biology Paper 2 2016', url: 'https://drive.google.com/uc?export=download&id=12yrvPzd0b0klMmyj2Mp1bIeRrMLUFzsD', type: 'past_paper' as const, year: '2016', paper: 'Paper 2' },
      { title: 'ECZ Biology Paper 3 2016', url: 'https://drive.google.com/uc?export=download&id=1iEgt_CbfdxpvV4fZnIU3BWkZ7SSCfh1T', type: 'past_paper' as const, year: '2016', paper: 'Paper 3' },
      { title: 'ECZ Biology Paper 1 2015', url: 'https://drive.google.com/uc?export=download&id=1nNmG3m0s-R4ZUm0p9zpKnR59FtvM_-lz', type: 'past_paper' as const, year: '2015', paper: 'Paper 1' },
      { title: 'ECZ Biology Paper 1 2014', url: 'https://drive.google.com/uc?export=download&id=14vD_BBUx2rPilfkIZQH1MZKqBkfyLir2', type: 'past_paper' as const, year: '2014', paper: 'Paper 1' },
      { title: 'ECZ Biology Paper 2 2014', url: 'https://drive.google.com/uc?export=download&id=1Dz09-Tah6EUcf6yOSbNjg7Dm4QIGoaa3', type: 'past_paper' as const, year: '2014', paper: 'Paper 2' },
    ],
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
    ],
    materials: [
      // Notes
      { title: 'O Level Physics Topical Revision', url: 'https://drive.google.com/uc?export=download&id=1X9EMVmVUW_n0myUiFE8vg-3QyjhAuriX', type: 'notes' as const },
      { title: 'Physics Made Simpler Pamphlet', url: 'https://drive.google.com/uc?export=download&id=19LVnDy8Q1zcmh9MoMYY5mTIH1EgTtfNw', type: 'notes' as const },
      { title: 'Grade 10-12 Physics Pamphlet', url: 'https://drive.google.com/uc?export=download&id=10wZz5k8CKtdMW7-Az6OldtTuKcsY6XhJ', type: 'notes' as const },
      { title: 'Grade 10-12 Physics Revision Guide', url: 'https://drive.google.com/uc?export=download&id=1TgfQT-3tKAQy4A3kMaSjJ3CzQGViVENm', type: 'notes' as const },
      { title: 'Grade 10-12 Physics Notes', url: 'https://drive.google.com/uc?export=download&id=1YhhlxRiZ4z7H9O_845ODQK3u-tJKt2r8', type: 'notes' as const },
      { title: 'eskulu Grade 10 Physics Notes', url: 'https://drive.google.com/uc?export=download&id=1u9jRbGGfbjN8GFImSEg791zIdkZn9YUo', type: 'notes' as const },
      { title: 'eskulu Grade 11 Physics Notes', url: 'https://drive.google.com/uc?export=download&id=10vLfy5LqtrdXswODG91z7fOgI7M_841A', type: 'notes' as const },
      { title: 'eskulu Grade 12 Physics Notes', url: 'https://drive.google.com/uc?export=download&id=1aGBetXcy79CuqJi8D2bhSsgAO8rHMBNG', type: 'notes' as const },
      { title: 'Physics 5054 Notes', url: 'https://drive.google.com/uc?export=download&id=1kqDsXv5f5pUPq5NFmqX3HluoK1bHnGyU', type: 'notes' as const },
      { title: 'Physics Pamphlet Simplified', url: 'https://drive.google.com/uc?export=download&id=1M_bInXJH8FuUiCl0KIA9oROS-4J9TnX5', type: 'notes' as const },
      // Past Papers
      { title: 'ECZ Physics Paper 1 2019', url: 'https://drive.google.com/uc?export=download&id=1-_NqjYIb1YS1YUvMsGlaa90kAmUOHMHq', type: 'past_paper' as const, year: '2019', paper: 'Paper 1' },
      { title: 'ECZ Physics Paper 2 2018', url: 'https://drive.google.com/uc?export=download&id=1jFX_Eqv1BkxoUKVNJW9tVFilKuAFAcjg', type: 'past_paper' as const, year: '2018', paper: 'Paper 2' },
      { title: 'ECZ Physics Paper 1 2017', url: 'https://drive.google.com/uc?export=download&id=1i1ITnEERNlAWBRXn0DvYiHXBASDwBq4a', type: 'past_paper' as const, year: '2017', paper: 'Paper 1' },
      { title: 'ECZ Physics Paper 2 2017', url: 'https://drive.google.com/uc?export=download&id=1kjplOCj3-aIVPJYoh-s1uypnenag0cCW', type: 'past_paper' as const, year: '2017', paper: 'Paper 2' },
      { title: 'ECZ Physics Paper 3 2017', url: 'https://drive.google.com/uc?export=download&id=1STGzdFeIsHWxlOBwJ_HveRKlZ4fxlnBL', type: 'past_paper' as const, year: '2017', paper: 'Paper 3' },
      { title: 'ECZ Physics Paper 1 2016', url: 'https://drive.google.com/uc?export=download&id=13FZa5V8snQQHSIc83127CDDFOzldPDNs', type: 'past_paper' as const, year: '2016', paper: 'Paper 1' },
      { title: 'ECZ Physics Paper 2 2016', url: 'https://drive.google.com/uc?export=download&id=1gJu9_covfuGUCyd06S27nEb2lOmE7kzM', type: 'past_paper' as const, year: '2016', paper: 'Paper 2' },
      { title: 'ECZ Physics Paper 3 2016', url: 'https://drive.google.com/uc?export=download&id=1pFAJGeVXPUpHSGqsbonk-8njApM9vuRM', type: 'past_paper' as const, year: '2016', paper: 'Paper 3' },
      { title: 'ECZ Physics Paper 1 2015', url: 'https://drive.google.com/uc?export=download&id=1Wgljdf5C3_KK1-iEqWE8sk1AWP22SGO1', type: 'past_paper' as const, year: '2015', paper: 'Paper 1' },
      { title: 'ECZ Physics Paper 2 2015', url: 'https://drive.google.com/uc?export=download&id=1Z5Lwn7O9Sd7qa93oypccou1fk2wMxiqH', type: 'past_paper' as const, year: '2015', paper: 'Paper 2' },
      { title: 'ECZ Physics Paper 1 2014', url: 'https://drive.google.com/uc?export=download&id=1cJD_cBxJSRX8v37FajzhNj0tgUdsVc8D', type: 'past_paper' as const, year: '2014', paper: 'Paper 1' },
      { title: 'ECZ Physics Paper 2 2014', url: 'https://drive.google.com/uc?export=download&id=18Sjwe3KhOACOelH-zjHbf-fvJqlZpGp4', type: 'past_paper' as const, year: '2014', paper: 'Paper 2' },
    ],
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
    ],
    materials: [
      // Notes
      { title: 'Chemistry 5070 Pamphlet', url: 'https://drive.google.com/uc?export=download&id=1wnQH97DpYgTj0V1dsLrAnyxdq4PcWqr8', type: 'notes' as const },
      { title: 'Chemistry 10-12 Notes 2nd Edition', url: 'https://drive.google.com/uc?export=download&id=1cyYZTCJHNLE_S80rBtzki9GMg_MyEtGJ', type: 'notes' as const },
      { title: 'Chemistry 10-12 Notes', url: 'https://drive.google.com/uc?export=download&id=1AiH8rEM7vx51sCi37osX-snIx7tRPwI-', type: 'notes' as const },
      { title: 'Chemistry 5070 Revision Work', url: 'https://drive.google.com/uc?export=download&id=1yIkPKxS_PIuydQ9a3KOLFTgxdXytrI-3', type: 'notes' as const },
      { title: 'Chemistry O Level Topical Revision Notes', url: 'https://drive.google.com/uc?export=download&id=1VSGRCl79la5nzpDudURem_m6s38zEENf', type: 'notes' as const },
      { title: 'eskulu Grade 10 Chemistry Notes', url: 'https://drive.google.com/uc?export=download&id=1r-2HQXlZQ_pylENSqugOR3iou5kzbaPA', type: 'notes' as const },
      { title: 'eskulu Grade 11 Chemistry Notes', url: 'https://drive.google.com/uc?export=download&id=1zYcQLxiGjNdtJB3CxBMXht26xm3VsDJ3', type: 'notes' as const },
      { title: 'eskulu Grade 12 Chemistry Notes', url: 'https://drive.google.com/uc?export=download&id=1HNQDqL9An0jTGbu3ckk8v0N97IaBjJiB', type: 'notes' as const },
      // Past Papers
      { title: 'ECZ Chemistry Paper 2 2020', url: 'https://drive.google.com/uc?export=download&id=17GQu5hSssuuuz4Og0UPSnfFkVvpl_wwC', type: 'past_paper' as const, year: '2020', paper: 'Paper 2' },
      { title: 'ECZ Chemistry Paper 1 2019', url: 'https://drive.google.com/uc?export=download&id=1Z0wvopQaQZZRXE9nGzOpOymY22t-ntZl', type: 'past_paper' as const, year: '2019', paper: 'Paper 1' },
      { title: 'ECZ Chemistry Paper 2 2019', url: 'https://drive.google.com/uc?export=download&id=1BWyBB-O2QzV3Qrmszizp5E_V7y7bXUwW', type: 'past_paper' as const, year: '2019', paper: 'Paper 2' },
      { title: 'ECZ Chemistry Paper 1 2018', url: 'https://drive.google.com/uc?export=download&id=1XLr4Gzzxa4OLeMgHBRmIjl4lhMBMgXcj', type: 'past_paper' as const, year: '2018', paper: 'Paper 1' },
      { title: 'ECZ Chemistry Paper 1 2017', url: 'https://drive.google.com/uc?export=download&id=1KPsUNURx3lSYot_YiZ4SV1gmcqLwS2IX', type: 'past_paper' as const, year: '2017', paper: 'Paper 1' },
      { title: 'ECZ Chemistry Paper 2 2017', url: 'https://drive.google.com/uc?export=download&id=1-VNTj27xpsiOVZa0T5olSXpuYBdQMAMf', type: 'past_paper' as const, year: '2017', paper: 'Paper 2' },
      { title: 'ECZ Chemistry Paper 3 2017', url: 'https://drive.google.com/uc?export=download&id=1RDk8zd2tr3NZLKeoKIUSEjaVVOnc3vZ1', type: 'past_paper' as const, year: '2017', paper: 'Paper 3' },
      { title: 'ECZ Chemistry Paper 1 2016', url: 'https://drive.google.com/uc?export=download&id=1D76ZhlUk3lAAOXEZN9LzI4VT9FUkNr_W', type: 'past_paper' as const, year: '2016', paper: 'Paper 1' },
      { title: 'ECZ Chemistry Paper 2 2016', url: 'https://drive.google.com/uc?export=download&id=1uM36CjfNrv6S0owy7H-glDou9hpsw8rg', type: 'past_paper' as const, year: '2016', paper: 'Paper 2' },
      { title: 'ECZ Chemistry Paper 3 2016', url: 'https://drive.google.com/uc?export=download&id=1KHv5aPq0jiZYPgvOVqFBu1W-tE76N-vo', type: 'past_paper' as const, year: '2016', paper: 'Paper 3' },
      { title: 'ECZ Chemistry Paper 1 2015', url: 'https://drive.google.com/uc?export=download&id=1pGmtEqBpb5Rf9UN5YexW2o5xRVt12_9R', type: 'past_paper' as const, year: '2015', paper: 'Paper 1' },
      { title: 'ECZ Chemistry Paper 2 2015', url: 'https://drive.google.com/uc?export=download&id=1UNZb4CYgTpqFmD_yOz-DlLji7XRZz4w3', type: 'past_paper' as const, year: '2015', paper: 'Paper 2' },
      { title: 'ECZ Chemistry Paper 1 2014', url: 'https://drive.google.com/uc?export=download&id=1fzjPTbFwsIK_4LOvrrS4WWBr7texh2ro', type: 'past_paper' as const, year: '2014', paper: 'Paper 1' },
      { title: 'ECZ Chemistry Paper 1 2009', url: 'https://drive.google.com/uc?export=download&id=1nl_l8Vg49gshkDH6l2JSqdXYuxkY3flF', type: 'past_paper' as const, year: '2009', paper: 'Paper 1' },
    ],
  },
  {
    title: 'English Language Grade 12 – ECZ',
    description: 'Develop reading comprehension, essay writing, grammar and oral communication skills aligned with the ECZ Grade 12 curriculum.',
    subject: 'English',
    grade_level: 'Grade 12',
    lessons: [
      { title: 'Reading Comprehension Strategies', content: 'Skimming, scanning, inference, main idea identification. Practice with ECZ-style passages.', video_url: 'https://www.youtube.com/watch?v=WMiLyFcfEjU', duration_minutes: 35 },
      { title: 'Essay Writing – Narrative and Descriptive', content: 'Structure of narrative essays, descriptive techniques, creating vivid imagery, planning and drafting.', video_url: 'https://www.youtube.com/watch?v=S5HnFdVbcqA', duration_minutes: 40 },
      { title: 'Grammar – Tenses and Sentence Structure', content: 'Past, present, future tenses, complex sentences, subordinate clauses, reported speech.', video_url: 'https://www.youtube.com/watch?v=xt_ZYNPFOsQ', duration_minutes: 35 },
      { title: 'Summary Writing Skills', content: 'Identifying key points, paraphrasing, word limits, ECZ summary format and marking criteria.', video_url: 'https://www.youtube.com/watch?v=eGWO1ldEhtQ', duration_minutes: 30 },
      { title: 'Letter Writing – Formal and Informal', content: 'Format of formal letters, tone and register, informal letter conventions, applications and complaints.', video_url: 'https://www.youtube.com/watch?v=MxI9YF-jLss', duration_minutes: 35 },
    ],
    materials: [
      // Notes
      { title: 'Senior Secondary English Notes - Rewrites', url: 'https://drive.google.com/uc?export=download&id=1NeB-46rX3q2AKejx-kCy4mEKHjLAa6DY', type: 'notes' as const },
      { title: 'English Notes - Structure, Comprehension & Summary', url: 'https://drive.google.com/uc?export=download&id=16OI9hTvGYnIujIPSXuAqzRx03DvRnPAk', type: 'notes' as const },
      { title: 'Grade 10-12 English P2 Pamphlet', url: 'https://drive.google.com/uc?export=download&id=1ojwEqH-JTauscKD0tsEoEyJqWkdRS8oH', type: 'notes' as const },
      { title: 'Grade 10-12 English Amplified Pamphlet', url: 'https://drive.google.com/uc?export=download&id=1y_zIy7g5ysS31mPaLTbVWRjjK66u7Ime', type: 'notes' as const },
      { title: 'Grade 10-12 English Language Pamphlet', url: 'https://drive.google.com/uc?export=download&id=1s7U8jq0mXtGy1zIAh3qvumQJ0_S6uEn1', type: 'notes' as const },
      { title: 'English Paper 2 Exams Made Easy', url: 'https://drive.google.com/uc?export=download&id=1kRuP2OQ6lLx2k-OMrssTlTSsMMXCP8gP', type: 'notes' as const },
      { title: 'English Self Study Guide', url: 'https://drive.google.com/uc?export=download&id=11OVX4-Eg0SoaBLiTtHtVXpq27f34KH-b', type: 'notes' as const },
      { title: 'Grammar Practice Workbook Grade 12', url: 'https://drive.google.com/uc?export=download&id=1lluZa2oH5cFiZO-RD5EHD6IbeU6D1VZY', type: 'notes' as const },
      // Past Papers
      { title: 'ECZ English Paper 1 2024', url: 'https://drive.google.com/uc?export=download&id=1IKpTOqNy53qG4en7grBANrtI_yV75RAl', type: 'past_paper' as const, year: '2024', paper: 'Paper 1' },
      { title: 'ECZ English Paper 1 2024 GCE', url: 'https://drive.google.com/uc?export=download&id=1DtzIrzfuFLVtU4l2GNaGrPj_8_JJXrkv', type: 'past_paper' as const, year: '2024', paper: 'Paper 1 GCE' },
      { title: 'ECZ English Paper 2 2024 GCE', url: 'https://drive.google.com/uc?export=download&id=1CmQqS16awrFnBqDfBCxzQ-Rny2LS9vJ3', type: 'past_paper' as const, year: '2024', paper: 'Paper 2 GCE' },
      { title: 'ECZ English Paper 1 2023', url: 'https://drive.google.com/uc?export=download&id=1q_D8rvIYOUMXL8bqni4ddBXshmk-k3Ik', type: 'past_paper' as const, year: '2023', paper: 'Paper 1' },
      { title: 'ECZ English Paper 1 2022', url: 'https://drive.google.com/uc?export=download&id=1HW7iWZILinelahPrzuP2aLyi-0uzmQiu', type: 'past_paper' as const, year: '2022', paper: 'Paper 1' },
      { title: 'ECZ English Paper 1 2021', url: 'https://drive.google.com/uc?export=download&id=17qaXCvMoeM0_bFLsQIOR7Zizgo-Wz3-Z', type: 'past_paper' as const, year: '2021', paper: 'Paper 1' },
      { title: 'ECZ English Paper 2 2020', url: 'https://drive.google.com/uc?export=download&id=1NL1sorfR2iUzqndNHYEKY44m9jCFXZCT', type: 'past_paper' as const, year: '2020', paper: 'Paper 2' },
      { title: 'ECZ English Paper 1 2020', url: 'https://drive.google.com/uc?export=download&id=13rJq1Y5V_dt_1OVYIcUEDbhbERuyAh_a', type: 'past_paper' as const, year: '2020', paper: 'Paper 1' },
      { title: 'ECZ English Paper 2 2019', url: 'https://drive.google.com/uc?export=download&id=1gvI3l1YVje14Gjre9oISY9ceVJs4dcht', type: 'past_paper' as const, year: '2019', paper: 'Paper 2' },
      { title: 'ECZ English Paper 1 2019', url: 'https://drive.google.com/uc?export=download&id=1JNhoOEAdAQ7qninHEUdWVeoFhSdgbyvk', type: 'past_paper' as const, year: '2019', paper: 'Paper 1' },
      { title: 'ECZ English Paper 1 2018', url: 'https://drive.google.com/uc?export=download&id=1mpOrtqYNA6_XFYYfavVFAA1tGUeY3Ts9', type: 'past_paper' as const, year: '2018', paper: 'Paper 1' },
      { title: 'ECZ English Paper 1 2017', url: 'https://drive.google.com/uc?export=download&id=132_5dMJVakvwKyzqJ5SGvgm3xYy9Sxzw', type: 'past_paper' as const, year: '2017', paper: 'Paper 1' },
      { title: 'ECZ English Paper 2 2017', url: 'https://drive.google.com/uc?export=download&id=1JnqbEs6Uz91gQU2n-Swzjy_3pvT9xK6n', type: 'past_paper' as const, year: '2017', paper: 'Paper 2' },
      { title: 'ECZ English Paper 1 2016', url: 'https://drive.google.com/uc?export=download&id=1ufO5VSc92uDI9vvWUQYuviRhelg43CB7', type: 'past_paper' as const, year: '2016', paper: 'Paper 1' },
      { title: 'ECZ English Paper 2 2016', url: 'https://drive.google.com/uc?export=download&id=1FSpFHzkobbhX0392iGdt7CaFVSyOgreh', type: 'past_paper' as const, year: '2016', paper: 'Paper 2' },
      { title: 'ECZ English Paper 2 2015', url: 'https://drive.google.com/uc?export=download&id=1_AwrwrHOgkMiYch4yJ9GuHaMng9_6BsH', type: 'past_paper' as const, year: '2015', paper: 'Paper 2' },
      { title: 'ECZ English Paper 1 2015', url: 'https://drive.google.com/uc?export=download&id=1dXl2_Px3IGwJtlQmHpI5FsVccQCh09G9', type: 'past_paper' as const, year: '2015', paper: 'Paper 1' },
      { title: 'ECZ English Paper 1 2014', url: 'https://drive.google.com/uc?export=download&id=13qkLI3T7jLSf7nCwwbkFiNYtj1Rfpt7X', type: 'past_paper' as const, year: '2014', paper: 'Paper 1' },
    ],
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
    ],
    materials: [
      // Notes
      { title: 'Civic Education Notes', url: 'https://drive.google.com/uc?export=download&id=1B34W9SgkhtvRyXjGILgjh1uyPxxH94Zx', type: 'notes' as const },
      { title: 'Quick Revision Civic Education', url: 'https://drive.google.com/uc?export=download&id=1ThD_kgctVsKm14y8jZIj9SGrm_DyygtA', type: 'notes' as const },
      { title: 'Civic Education Revision Pamphlet', url: 'https://drive.google.com/uc?export=download&id=1oQMmKHXVdbjAk9yZmhFfbZftqw-RZrdl', type: 'notes' as const },
      { title: 'Distinction in Civic Education', url: 'https://drive.google.com/uc?export=download&id=13OyL3DMlNSDoWZlH4ESHnVeqlS0VjeyC', type: 'notes' as const },
      // Past Papers
      { title: 'ECZ Civic Education 2024', url: 'https://drive.google.com/uc?export=download&id=1_Za8rkJG0zHrqhQhk8I-U6afCZXAcfDm', type: 'past_paper' as const, year: '2024' },
      { title: 'ECZ Civic Education 2024 GCE', url: 'https://drive.google.com/uc?export=download&id=160ZLeqN4BitG_0zzQQ9LM57BadgeSBzT', type: 'past_paper' as const, year: '2024' },
      { title: 'ECZ Civic Education 2023', url: 'https://drive.google.com/uc?export=download&id=1lmMqmuFVxrM1OOtnVK_-Suj00I3Z7tWq', type: 'past_paper' as const, year: '2023' },
      { title: 'ECZ Civic Education 2022', url: 'https://drive.google.com/uc?export=download&id=1Xw9lsjff0E14Y60V5Vn1gc3ZVkZlF8kp', type: 'past_paper' as const, year: '2022' },
      { title: 'ECZ Civic Education 2021', url: 'https://drive.google.com/uc?export=download&id=1BS91P0eT92w2U_P6utggN5xVsKeWq6f1', type: 'past_paper' as const, year: '2021' },
      { title: 'ECZ Civic Education 2020', url: 'https://drive.google.com/uc?export=download&id=1Hg4E4VPvvzXw_WBza_lCI1m2GLgicQGH', type: 'past_paper' as const, year: '2020' },
      { title: 'ECZ Civic Education Paper 1 2019', url: 'https://drive.google.com/uc?export=download&id=1GJm1meZv9rV2uoBWbXSkBKFTnXIzF8tp', type: 'past_paper' as const, year: '2019', paper: 'Paper 1' },
      { title: 'ECZ Civic Education Paper 2 2019', url: 'https://drive.google.com/uc?export=download&id=1SzuNrvK3C_iWqLu_EQUVJbSG-K7CV4U_', type: 'past_paper' as const, year: '2019', paper: 'Paper 2' },
      { title: 'ECZ Civic Education Paper 1 2018', url: 'https://drive.google.com/uc?export=download&id=1hRxFOQvCuOZzWP74SpWc-eZ7xaBsC38I', type: 'past_paper' as const, year: '2018', paper: 'Paper 1' },
      { title: 'ECZ Civic Education Paper 1 2017', url: 'https://drive.google.com/uc?export=download&id=1FmrqEagZC_f15qPFuiOgPXjJ_dzuD1eT', type: 'past_paper' as const, year: '2017', paper: 'Paper 1' },
      { title: 'ECZ Civic Education Paper 2 2017', url: 'https://drive.google.com/uc?export=download&id=1jvHPm7QwnDxOSOM8HAlrGG2bvwK4N--D', type: 'past_paper' as const, year: '2017', paper: 'Paper 2' },
      { title: 'ECZ Civic Education Paper 1 2016', url: 'https://drive.google.com/uc?export=download&id=13UQhGdt2JmTW_Hn_KTNsfS-FOOdfEkbi', type: 'past_paper' as const, year: '2016', paper: 'Paper 1' },
      { title: 'ECZ Civic Education Paper 2 2016', url: 'https://drive.google.com/uc?export=download&id=11bl6s8F0gXfUXTk3RbROcE0sabRZxfT6', type: 'past_paper' as const, year: '2016', paper: 'Paper 2' },
      { title: 'ECZ Civic Education Paper 1 2015', url: 'https://drive.google.com/uc?export=download&id=1ZrkpGP8b1McM93nCXLbPV9_KL_OU5evK', type: 'past_paper' as const, year: '2015', paper: 'Paper 1' },
      { title: 'ECZ Civic Education Paper 2 2015', url: 'https://drive.google.com/uc?export=download&id=1fnmV-0Pb-IToF2z35K_z1vYFl7pPReuV', type: 'past_paper' as const, year: '2015', paper: 'Paper 2' },
    ],
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
    ],
    materials: [
      // Notes
      { title: 'Geography Detailed Pamphlet', url: 'https://drive.google.com/uc?export=download&id=18Wj9kvYW1AQKONPYZUvLh8eQqMIiOM6D', type: 'notes' as const },
      { title: 'Geography Pamphlet', url: 'https://drive.google.com/uc?export=download&id=1iCgfRH3w2gKF-iA6dk_Sq0krtDfAqLyw', type: 'notes' as const },
      { title: 'Geography Notes - Earth\'s Movements & Volcanoes', url: 'https://drive.google.com/uc?export=download&id=1hROV96rJQW1xv4m15EcDYbds7fm48mCH', type: 'notes' as const },
      { title: 'Geography Notes - Map Reading', url: 'https://drive.google.com/uc?export=download&id=1F44YH-Eu5oxgD46L5CQizzycZloZ63rT', type: 'notes' as const },
      { title: 'Geography Notes - Rivers', url: 'https://drive.google.com/uc?export=download&id=1PSv4fQCLuFHIHFhLJ5RrPll4WqsrE1Bt', type: 'notes' as const },
      { title: 'Geography Notes - Weather and Climate', url: 'https://drive.google.com/uc?export=download&id=1bDG8GZLDG75dsLlkKLZ_itoPCAaBwP9_', type: 'notes' as const },
      // Past Papers
      { title: 'ECZ Geography Paper 1 2024', url: 'https://drive.google.com/uc?export=download&id=12ricMGn5wA202L2Sf1K-6goRe2kEpq6s', type: 'past_paper' as const, year: '2024', paper: 'Paper 1' },
      { title: 'ECZ Geography Paper 2 2024 GCE', url: 'https://drive.google.com/uc?export=download&id=1jiIbPwD3p3mqegsdQ3RyuSz49Li2aav_', type: 'past_paper' as const, year: '2024', paper: 'Paper 2 GCE' },
      { title: 'ECZ Geography Paper 2 2023', url: 'https://drive.google.com/uc?export=download&id=12qsY2dPO-2_KQZ-4doqwl5JTX55-4lHx', type: 'past_paper' as const, year: '2023', paper: 'Paper 2' },
      { title: 'ECZ Geography Paper 1 2022', url: 'https://drive.google.com/uc?export=download&id=1CAycptSL3kJ3HOaoV_ktOoo8PtSZ41Du', type: 'past_paper' as const, year: '2022', paper: 'Paper 1' },
      { title: 'ECZ Geography Paper 2 2022', url: 'https://drive.google.com/uc?export=download&id=1baUaW5HuuwM7JdPYn8-1hk6OwhZBgyua', type: 'past_paper' as const, year: '2022', paper: 'Paper 2' },
      { title: 'ECZ Geography Paper 1 2021', url: 'https://drive.google.com/uc?export=download&id=1bHT3TBVHfItslMLTgoFwnqFz-NDBwI9b', type: 'past_paper' as const, year: '2021', paper: 'Paper 1' },
      { title: 'ECZ Geography Paper 2 2020', url: 'https://drive.google.com/uc?export=download&id=1__yBHow6xTCB4dpvxrtl9whssSzYVj_T', type: 'past_paper' as const, year: '2020', paper: 'Paper 2' },
      { title: 'ECZ Geography Paper 1 2020', url: 'https://drive.google.com/uc?export=download&id=10q2CaOLEdOTP5zxHcNW-kyQMbv0Kl3G1', type: 'past_paper' as const, year: '2020', paper: 'Paper 1' },
      { title: 'ECZ Geography Paper 1 2019', url: 'https://drive.google.com/uc?export=download&id=1xdpNC3TJfR_qjKzNMScEagzVHXsQD3lk', type: 'past_paper' as const, year: '2019', paper: 'Paper 1' },
      { title: 'ECZ Geography Paper 2 2019', url: 'https://drive.google.com/uc?export=download&id=1uMexCoDw3_au-sgqc8NWW2RyS3eUlzrL', type: 'past_paper' as const, year: '2019', paper: 'Paper 2' },
      { title: 'ECZ Geography Paper 1 2018', url: 'https://drive.google.com/uc?export=download&id=1RcZAAlL2_mls8X1sWkMUu03aFu-3j5VX', type: 'past_paper' as const, year: '2018', paper: 'Paper 1' },
      { title: 'ECZ Geography Paper 2 2018', url: 'https://drive.google.com/uc?export=download&id=1O4wcFPXTHc4K3bIkKKMYU3_Kqq_vDAK4', type: 'past_paper' as const, year: '2018', paper: 'Paper 2' },
      { title: 'ECZ Geography Paper 1 2017', url: 'https://drive.google.com/uc?export=download&id=1n4k5ZV8SLRyI4uRqlo6ttVPz18ka_LEf', type: 'past_paper' as const, year: '2017', paper: 'Paper 1' },
      { title: 'ECZ Geography Paper 2 2017', url: 'https://drive.google.com/uc?export=download&id=1CUM1yYg-N8y17mtoaWuhLbRdee8na2bR', type: 'past_paper' as const, year: '2017', paper: 'Paper 2' },
    ],
  },
  {
    title: 'Science Grade 12 – ECZ (Physics & Chemistry)',
    description: 'Integrated Science for Grade 12 covering physics and chemistry fundamentals with ECZ past papers from 2009-2024.',
    subject: 'Science',
    grade_level: 'Grade 12',
    lessons: [
      { title: 'Introduction to Cells and Microscopy', content: 'Using a microscope, plant and animal cells, cell organelles, preparing slides.', video_url: 'https://www.youtube.com/watch?v=URUJD5NEXC8', duration_minutes: 35 },
      { title: 'States of Matter and Changes', content: 'Solids, liquids, gases, melting, boiling, evaporation, condensation, particle theory.', video_url: 'https://www.youtube.com/watch?v=s-KvoVzukHo', duration_minutes: 30 },
      { title: 'Forces and Motion Basics', content: 'Types of forces, balanced and unbalanced forces, speed calculations, distance-time graphs.', video_url: 'https://www.youtube.com/watch?v=ZM8ECpBuQYE', duration_minutes: 35 },
      { title: 'Chemical Reactions and Equations', content: 'Signs of chemical reactions, word equations, balancing symbol equations, types of reactions.', video_url: 'https://www.youtube.com/watch?v=eNsVaUCzvLA', duration_minutes: 40 },
      { title: 'The Human Digestive System', content: 'Organs of digestion, enzymes, absorption in the small intestine, healthy diet and nutrition.', video_url: 'https://www.youtube.com/watch?v=Og5xAdC8EUI', duration_minutes: 35 },
      { title: 'Electricity and Circuits', content: 'Current, voltage, resistance, series and parallel circuits, circuit diagrams, safety with electricity.', video_url: 'https://www.youtube.com/watch?v=VnnpLaKsqGU', duration_minutes: 40 },
    ],
    materials: [
      // Notes
      { title: 'eskulu Grade 10 Physics Notes', url: 'https://drive.google.com/uc?export=download&id=1u9jRbGGfbjN8GFImSEg791zIdkZn9YUo', type: 'notes' as const },
      { title: 'eskulu Grade 11 Physics Notes', url: 'https://drive.google.com/uc?export=download&id=10vLfy5LqtrdXswODG91z7fOgI7M_841A', type: 'notes' as const },
      { title: 'eskulu Grade 12 Physics Notes', url: 'https://drive.google.com/uc?export=download&id=1aGBetXcy79CuqJi8D2bhSsgAO8rHMBNG', type: 'notes' as const },
      { title: 'O Level Physics Topical Revision', url: 'https://drive.google.com/uc?export=download&id=1X9EMVmVUW_n0myUiFE8vg-3QyjhAuriX', type: 'notes' as const },
      { title: 'O Level Chemistry Topical Revision', url: 'https://drive.google.com/uc?export=download&id=1VSGRCl79la5nzpDudURem_m6s38zEENf', type: 'notes' as const },
      { title: 'eskulu Grade 10 Chemistry Notes', url: 'https://drive.google.com/uc?export=download&id=1r-2HQXlZQ_pylENSqugOR3iou5kzbaPA', type: 'notes' as const },
      { title: 'eskulu Grade 12 Chemistry Notes', url: 'https://drive.google.com/uc?export=download&id=1HNQDqL9An0jTGbu3ckk8v0N97IaBjJiB', type: 'notes' as const },
      // Past Papers
      { title: 'ECZ Science Paper 1 2024', url: 'https://drive.google.com/uc?export=download&id=1Ib1CAstwsSEzDIsXmFcZEER5pAkIvYUG', type: 'past_paper' as const, year: '2024', paper: 'Paper 1' },
      { title: 'ECZ Science Paper 2 2024', url: 'https://drive.google.com/uc?export=download&id=1zACRhVprbK-E-quLrcgZhbK9gZ2EC0kh', type: 'past_paper' as const, year: '2024', paper: 'Paper 2' },
      { title: 'ECZ Science Paper 1 2024 GCE', url: 'https://drive.google.com/uc?export=download&id=1AalvzQ9qTOqF6FwX3S8HtT4vGbH_fENN', type: 'past_paper' as const, year: '2024', paper: 'Paper 1 GCE' },
      { title: 'ECZ Science Paper 2 2024 GCE', url: 'https://drive.google.com/uc?export=download&id=1tzuTg-FgEjR63RlfsKqlEjUwco9iRKsm', type: 'past_paper' as const, year: '2024', paper: 'Paper 2 GCE' },
      { title: 'ECZ Science Paper 1 2023', url: 'https://drive.google.com/uc?export=download&id=1bo19fn8I_Kqx4QOO19YdqAARi7RVgbrX', type: 'past_paper' as const, year: '2023', paper: 'Paper 1' },
      { title: 'ECZ Science Paper 2 2023', url: 'https://drive.google.com/uc?export=download&id=1BZYOw9yJNfF-JM8rjhMuJOZ3E7wREReI', type: 'past_paper' as const, year: '2023', paper: 'Paper 2' },
      { title: 'ECZ Science Paper 1 2022', url: 'https://drive.google.com/uc?export=download&id=1WA1-cgOVldNA8yCkale8uwrNp3HEhDwZ', type: 'past_paper' as const, year: '2022', paper: 'Paper 1' },
      { title: 'ECZ Science Paper 2 2022', url: 'https://drive.google.com/uc?export=download&id=1PMh_PBNi4cZG_qHMaWRah-fHs3RPQ7Xv', type: 'past_paper' as const, year: '2022', paper: 'Paper 2' },
      { title: 'ECZ Science Paper 1 2021', url: 'https://drive.google.com/uc?export=download&id=1lBz8PIlcHbDBEdATdhJsW9-FNKgtruYC', type: 'past_paper' as const, year: '2021', paper: 'Paper 1' },
      { title: 'ECZ Science Paper 2 2021', url: 'https://drive.google.com/uc?export=download&id=183bpk3bTrCBvqjs7XDhk75yHix-bEmsv', type: 'past_paper' as const, year: '2021', paper: 'Paper 2' },
      { title: 'ECZ Science Paper 1 2020', url: 'https://drive.google.com/uc?export=download&id=1u9Qzizz8UDAm872o-Z3frAYPTcO9sRXv', type: 'past_paper' as const, year: '2020', paper: 'Paper 1' },
      { title: 'ECZ Science Paper 2 2020', url: 'https://drive.google.com/uc?export=download&id=1kUOQFubDDDPAjyn39Lmr2UZEcCu9bSNN', type: 'past_paper' as const, year: '2020', paper: 'Paper 2' },
      { title: 'ECZ Science Paper 1 2019 GCE', url: 'https://drive.google.com/uc?export=download&id=18KulE1h9z-XWG7b4yCVHz9rdzYtHSSXI', type: 'past_paper' as const, year: '2019', paper: 'Paper 1 GCE' },
      { title: 'ECZ Science Paper 2 2019', url: 'https://drive.google.com/uc?export=download&id=13aZLLJCuEcEL2IiVOVjEroAzvd9MUhq4', type: 'past_paper' as const, year: '2019', paper: 'Paper 2' },
    ],
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
    ],
    materials: [],
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
    ],
    materials: [],
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
    ],
    materials: [],
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

    const authClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )
    const { data: { user }, error: authError } = await authClient.auth.getUser()
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

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
    let totalMaterials = 0

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

      // Insert materials
      if (courseData.materials && courseData.materials.length > 0) {
        const materialsToInsert = courseData.materials.map(m => ({
          course_id: course.id,
          title: m.title,
          url: m.url,
          type: m.type,
          year: m.year || null,
          paper: m.paper || null,
        }))

        const { error: materialsError } = await supabaseClient
          .from('course_materials')
          .insert(materialsToInsert)

        if (materialsError) {
          console.error('Error creating materials for:', courseData.title, materialsError)
        } else {
          totalMaterials += materialsToInsert.length
        }
      }
    }

    return new Response(
      JSON.stringify({ message: `Seeded ${totalCourses} ECZ courses with ${totalLessons} lessons and ${totalMaterials} study materials`, count: totalCourses }),
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
