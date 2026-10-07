
// Cada publicação da página /publicacoes. Para adicionar um texto, inclua um item em "publications" (abaixo).
// "paragraphs" (opcional) mostra o texto completo dentro do site; "url" (opcional) leva ao texto original.
export type Publication = {
  title: string;
  type?: string;
  date?: string;
  summary: string;
  paragraphs?: string[];
  url?: string;
  linkLabel?: string;
};

// Foto em WebP com várias larguras. "src" é o tamanho padrão; "srcSet" deixa o navegador escolher o menor arquivo que serve.
function photo(name: string, widths: readonly [number, number, number], width: number, height: number) {
  return {
    src: `/img/${name}-${widths[1]}.webp`,
    srcSet: widths.map((w) => `/img/${name}-${w}.webp ${w}w`).join(", "),
    width,
    height,
  };
}

export const site = {
  // Endereço oficial do site (sem barra no final). Usado em canonical, sitemap, compartilhamento e dados estruturados.
  url: "https://www.jessicalagopsi.com",
  // Imagem de pré-visualização ao compartilhar o link (WhatsApp, redes sociais, Google).
  ogImage: "/img/og-image.jpg",
  name: "Jéssica Priscila Lago",
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
  portrait: photo("jessica-lago-retrato", [640, 960, 1280], 1280, 1919),
  office: photo("consultorio-jessica-lago", [640, 960, 1280], 1280, 853),
  // Consultório compartilhado com outras profissionais. O "url" é o site da Serenitah.
  clinic: {
    name: "Serenitah",
    fullName: "Serenitah Terapias Integradas",
    url: "https://www.serenitah.com",
    label: "Conhecer o site da Serenitah",
    photo: photo("serenitah-equipe", [640, 960, 1440], 1440, 960),
    address: "Asa Norte, Brasília - DF, 70701-040, Brasil",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Asa%20Norte%2C%20Bras%C3%ADlia%20-%20DF%2C%2070701-040%2C%20Brasil",
  },
  instagramUrl: "https://www.instagram.com/psi.jessicalago",
  instagramHandle: "@psi.jessicalago",
  linkedinUrl: "https://www.linkedin.com/in/j%C3%A9ssica-priscila-lago-29211778",
  publications: [] as Publication[],
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
    { name: "Psicoterapia online", description: "Atendimento por Google Meet, em link privativo fixo. Também para brasileiros que moram fora do país.", mode: "Online · Brasil e exterior", duration: "Em média, 50 min", price: "R$ 180" },
    { name: "Psicologia jurídica", description: "Perícia ou assistência técnica, laudo pericial e formulação de quesitos para prova pericial psicológica.", mode: "Consulte a modalidade", duration: "Conforme a demanda", price: "Consultar valores" },
  ],
  faq: [
    { question: "Como é a primeira consulta?", answer: "É um momento para conversar sobre o que motivou sua procura e combinar como será o acompanhamento." },
    { question: "Você atende online?", answer: "Sim. O atendimento online acontece pelo Google Meet, por meio de um link privativo fixo." },
    { question: "Você atende brasileiros que moram fora do país?", answer: "Sim. Atendo brasileiros que vivem no exterior em sessões online, pelo Google Meet. O horário é combinado levando em conta a diferença de fuso." },
    { question: "Quanto tempo dura cada sessão?", answer: "Cada sessão dura, em média, 50 minutos. Esse tempo pode variar conforme a pessoa ou a sessão." },
    { question: "Qual é a frequência das sessões?", answer: "A recomendação é de uma a duas vezes por semana. Dependendo do caso, sessões quinzenais podem ser combinadas após o início." },
    { question: "O atendimento é sigiloso?", answer: "O atendimento psicológico segue os deveres éticos de sigilo profissional. Em serviços de psicologia jurídica, as condições são esclarecidas conforme a demanda." },
    { question: "Você atende por convênio?", answer: "O atendimento é particular, com emissão de nota fiscal. A nota pode ser usada para solicitar reembolso se o convênio oferecer essa possibilidade." },
    { question: "Quanto tempo dura o processo?", answer: "Não há um prazo único para o acompanhamento. A decisão de continuar ou encerrar é conversada ao longo do processo." },
    { question: "Como funciona a psicologia jurídica?", answer: "O perfil oferece perícia ou assistência técnica, laudo pericial e formulação de quesitos para prova pericial psicológica. Consulte disponibilidade e valores para a sua demanda." },
    { question: "Como posso começar?", answer: "Você pode verificar os horários e agendar uma consulta pelo meu perfil no Doctoralia." },
  ],
  reviews: [
    { quote: "Jéssica me acompanha a quase um ano e tem sido essencial em meu acompanhamento. Recomendo", author: "Mariana F." },
    { quote: "Tivemos apenas duas sessões, mas já me sinto bastante satisfeito e seguro. Me deixou bastante confortável, foi clara nas explicações.", author: "Rogerio Tanamatis" },
    { quote: "Meu processo de análise com a Jéssica é excelente! Muito cuidadosa, estamos conseguindo avançar com várias questões importantes. Ser acompanhada por ela está sendo muito importante para o meu desenvolvimento pessoal.", author: "AP" },
    { quote: "Faço atendimento com a psicanalista Jéssica Lago há quase um ano. Embora jovem, considero-a muito profissional, competente e atenciosa.", author: "Denise Griesinger" },
  ],
} as const;
