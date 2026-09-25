import portraitAsset from "../assets/jessica-lago-retrato.png.asset.json";
import officeAsset from "../assets/consultorio-jessica-lago.png.asset.json";

export const site = {
  name: "Jéssica Lago",
  firstName: "Jéssica",
  profession: "Psicóloga · Psicanalista",
  registration: "CRP DF 20947",
  city: "Brasília",
  neighborhood: "Setor Hoteleiro Norte",
  address: "SHN, Quadra 1, Bloco D, Sala 1107, Conjunto A, 11º andar, Edifício Fusion Work e Live, Brasília — DF, 70701-040",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=-15.7898359,-47.8852539",
  profileUrl: "https://www.doctoralia.com.br/jessica-lago/psicologo-psicanalista/brasilia",
  reviewUrl: "https://www.doctoralia.com.br/jessica-lago/psicologo-psicanalista/brasilia#profile-reviews",
  bookingLabel: "Agendar consulta",
  appointmentDuration: "Em média, 50 minutos",
  price: "R$ 180",
  rating: "5,0",
  reviewCount: 7,
  portrait: portraitAsset.url,
  office: officeAsset.url,
  education: [
    "Bacharel em Psicologia pelo Centro Universitário de Brasília (UniCEUB)",
    "Pós-graduada em Teoria Psicanalítica pelo UniCEUB",
    "Formação contínua em Psicanálise Clínica, supervisão e grupos de estudo",
    "Formações complementares em tanatologia, saúde mental, relações amorosas e educação perinatal e parental",
  ],
  specialties: ["Psicanálise", "Psicologia jurídica", "Relacionamentos", "Gravidez e maternidade", "Orientação a pais"],
  concerns: [
    { title: "Ansiedade e angústia", text: "Quando a inquietação ocupa mais espaço do que você gostaria." },
    { title: "Relações e conflitos", text: "Quando certos encontros parecem repetir os mesmos impasses." },
    { title: "Mudanças e perdas", text: "Quando uma despedida ou mudança pede tempo para ser compreendida." },
    { title: "Maternidade e parentalidade", text: "Quando cuidar também traz dúvidas, ambivalências e novas perguntas." },
    { title: "Humor e depressão", text: "Quando os dias parecem pesados e é difícil nomear o que acontece." },
    { title: "Violência de gênero", text: "Quando é necessário encontrar palavras para experiências difíceis." },
  ],
  services: [
    { name: "Psicoterapia presencial", description: "Atendimento psicológico individual no consultório em Brasília.", mode: "Presencial · Brasília", duration: "Em média, 50 min", price: "R$ 180" },
    { name: "Psicoterapia online", description: "Atendimento por Google Meet, em link privativo fixo.", mode: "Online", duration: "Em média, 50 min", price: "R$ 180" },
    { name: "Psicologia jurídica", description: "Perícia ou assistência técnica, laudo pericial e formulação de quesitos para prova pericial psicológica.", mode: "Consulte a modalidade", duration: "Conforme a demanda", price: "Consultar valores" },
  ],
  reviews: [
    { quote: "Jéssica me acompanha a quase um ano e tem sido essencial em meu acompanhamento. Recomendo", author: "Mariana F." },
    { quote: "Tivemos apenas duas sessões, mas já me sinto bastante satisfeito e seguro. Me deixou bastante confortável, foi clara nas explicações.", author: "Rogerio Tanamatis" },
    { quote: "Meu processo de análise com a Jéssica é excelente! Muito cuidadosa, estamos conseguindo avançar com várias questões importantes. Ser acompanhada por ela está sendo muito importante para o meu desenvolvimento pessoal.", author: "AP" },
    { quote: "Faço atendimento com a psicanalista Jéssica Lago há quase um ano. Embora jovem, considero-a muito profissional, competente e atenciosa.", author: "Denise Griesinger" },
  ],
} as const;
