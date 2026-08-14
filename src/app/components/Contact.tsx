import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MessageSquare, MapPin } from "lucide-react";

export function Contact() {
  const railRef = useRef<HTMLElement | null>(null);
  const clearActiveTimer = useRef(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let scrollTimer = 0;
    let commandTimer = 0;
    const open = () => {
      rail.classList.add("is-command-open");
      window.clearTimeout(commandTimer);
      commandTimer = window.setTimeout(() => rail.classList.remove("is-command-open"), 1500);
    };
    const onScroll = () => {
      rail.classList.add("is-scrolling");
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => rail.classList.remove("is-scrolling"), 420);
    };
    window.addEventListener("portfolio:contact-rail-open", open);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("portfolio:contact-rail-open", open); window.removeEventListener("scroll", onScroll); window.clearTimeout(scrollTimer); window.clearTimeout(commandTimer); window.clearTimeout(clearActiveTimer.current); };
  }, []);

  const links = [
    { icon: Phone, label: "手机", value: "18101767127" },
    { icon: Mail, label: "邮箱", value: "18101767127@163.com" },
    { icon: MessageSquare, label: "微信", value: "chenbw0610" },
    { icon: MapPin, label: "所在城市", value: "上海" },
  ];
  return (
    <aside ref={railRef} className="contact-rail" aria-label="联系方式">
      {links.map((link, index) => {
        const Icon = link.icon;
        const content = <><span className="contact-rail-icon"><Icon /></span><span className="contact-rail-copy"><small>{link.label}</small><strong>{link.value}</strong></span></>;
        const note = <div tabIndex={0} className={`contact-rail-note contact-rail-note-${index}`}>{content}</div>;
        const activate = () => { window.clearTimeout(clearActiveTimer.current); setActiveIndex(index); };
        const deactivate = () => { window.clearTimeout(clearActiveTimer.current); clearActiveTimer.current = window.setTimeout(() => setActiveIndex(null), 160); };
        return <div key={link.label} onPointerEnter={activate} onPointerLeave={deactivate} onFocus={activate} onBlur={deactivate} className={`contact-rail-hit contact-rail-hit-${index} ${activeIndex === index ? "is-active" : ""}`}>{note}</div>;
      })}
    </aside>
  );
}
