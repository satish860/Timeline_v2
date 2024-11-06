import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "I'm interested in trying AskJunior Timeline, but can I see its features and capabilities first? What's the process?",
    answer:
      "Absolutely! We’re pleased to offer you a firsthand experience with AskJunior Timeline. Simply click here to create an account, and you’ll receive 500 pages of usage at no cost. If you'd prefer to learn more before diving in, feel free to schedule a demo, and our team will gladly walk you through the features and answer any questions you might have.",
    value: "item-1",
  },
  {
    question: "How does AskJunior Timeline maintain compliance with data security standards for law firms, especially for enterprise-level practices?",
    answer:
      "By default, AskJunior Timeline operates securely on Google Cloud as part of our partnership with Google for Startups. We also have the flexibility to switch to Microsoft Azure upon request, thanks to our partnership with Microsoft for Startups. With these trusted providers, we ensure high security and compliance standards, and we are actively pursuing SOC 2 and ISO 27001 certifications to further validate our commitment to safeguarding your data. Additionally, we’re working to offer deployments on any cloud provider of your choice, providing a fully customizable solution to meet your firm’s specific requirements (coming soon).",
    value: "item-2",
  },
  {
    question: "Is AskJunior Timeline suitable for small firms, solo practitioners, and barristers?",
    answer:
      "Yes, AskJunior Timeline is designed to be accessible to all legal professionals, including small firms, solo practitioners, and barristers. Our platform is built to be user-friendly and efficient, making it easy to use for professionals of all sizes and specialties.",
    value: "item-3",
  },
  {
    question: " I’ve seen many legal AI products. What makes AskJunior Timeline different?",
    answer:
      `Unlike other legal AI tools that rely on chatbot interactions or low/no-code platforms requiring legal and AI expertise, 
      AskJunior Timeline is purpose-built to simplify your workflow without these constraints. 
      Our platform offers tailored automation designed to fit your firm’s unique needs, 
      coupled with an intuitive interface that anyone can use—no specialized AI knowledge required. 
      With just a few clicks, you can generate a complete Timeline, enabling you to focus more on strategic work and less on data handling.`,
    value: "item-4",
  },
  {
    question: "Can AskJunior Timeline handle documents with poor scan quality or handwritten notes?",
    answer:
      "Yes, AskJunior Timeline is designed to handle a wide range of document types, including those with poor scan quality or handwritten notes. Our platform uses advanced AI algorithms to extract and organize information from various sources, ensuring that your timelines are comprehensive and accurate.",
    value: "item-5",
  },
  {
    question: "How does AskJunior Timeline ensure the accuracy of the generated chronologies?",
    answer:
      ` AskJunior Timeline operates solely on the documents you provide, ensuring that all outputs are directly grounded in your case materials, 
      eliminating any risk of AI "hallucination." Our multi-stage AI processing rigorously verifies and cross-checks information against the source documents, 
      providing you with reliable, accurate chronologies that you can trust..`,
    value: "item-6",
  },
  {
    question: "Can AskJunior Timeline provide custom reports beyond chronologies?",
    answer:
      `Absolutely! In addition to timeline generation, we work closely with lawyers to create a variety of custom reports, 
      including evidence analysis and automated due diligence. 
      Our team is ready to help tailor reports to fit your specific needs, streamlining various aspects of case preparation and analysis.
      If you have a unique requirement, just let us know—we’re happy to support your practice with customized solutions.`,
    value: "item-7",
  },
];

export const FAQSection = () => {
  return (
    <section
      id="faq"
      className="container mx-auto px-12 md:w-[700px] py-24 sm:py-32"
    >
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          FAQS
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Common Questions
        </h2>
      </div>

      <Accordion type="single" collapsible className="AccordionRoot">
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left text-base md:text-lg font-medium">
              {question}
            </AccordionTrigger>

            <AccordionContent className="text-base md:text-md">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
