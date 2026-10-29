import { Plus } from "lucide-react";

type FaqItem = { q: string; a: string };

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq-list">
      {items.map((item) => (
        <details className="faq-item" key={item.q}>
          <summary>
            {item.q}
            <Plus aria-hidden="true" />
          </summary>
          <div className="faq-item__answer">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
