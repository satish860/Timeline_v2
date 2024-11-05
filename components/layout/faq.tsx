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
    question: "What is a legal timeline generator?",
    answer:
      "A legal timeline generator is a tool that helps legal professionals create organized, chronological representations of case events. It automatically formats and arranges dates, events, and supporting documentation into a clear, professional timeline that can be used for case preparation, court presentations, or client communications.",
    value: "item-1",
  },
  {
    question: "How does the timeline generator work?",
    answer:
      "Simply input your case events with their corresponding dates and descriptions. The tool automatically organizes these entries chronologically, allows you to add supporting documentation, and generates a clean, professional timeline. You can easily edit, rearrange, and export your timeline in various formats.",
    value: "item-2",
  },
  {
    question: "What file formats can I use to export my timeline?",
    answer:
      "Our timeline generator supports exports in multiple formats including PDF, Word, Excel, and PowerPoint. You can also generate interactive digital timelines that can be shared via secure links with your team or clients.",
    value: "item-3",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we take data security seriously. All data is encrypted both in transit and at rest, and we comply with industry-standard security protocols. Our servers are located in secure facilities, and we regularly perform security audits to ensure your sensitive legal information remains protected.",
    value: "item-4",
  },
  {
    question: "Can I collaborate with my team on timelines?",
    answer:
      "Yes, our platform supports real-time collaboration. Multiple team members can work on the same timeline simultaneously, with changes tracked and synchronized automatically. You can also control access permissions and share specific timelines with designated team members.",
    value: "item-5",
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
