import { motion } from "motion/react";
import { Mail, Phone, MessageSquare, MapPin, ArrowUpRight } from "lucide-react";

export function Contact() {
  const links = [
    { icon: Phone, label: "手机", value: "18101767127", href: "tel:18101767127" },
    { icon: Mail, label: "邮箱", value: "18101767127@163.com", href: "mailto:18101767127@163.com" },
    { icon: MessageSquare, label: "微信", value: "chenbw0610", href: null },
    { icon: MapPin, label: "所在城市", value: "上海", href: null },
  ];

  return (
    <section id="contact" className="relative py-16 md:py-20 px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[24px] border border-[#E6E7EB] bg-white shadow-[0_1px_2px_rgba(26,28,36,0.04)] p-8 sm:p-10 md:p-12 lg:p-14"
        >
          <div
            className="absolute -top-40 -left-20 size-[500px] rounded-full blur-3xl opacity-[0.08]"
            style={{ background: "radial-gradient(circle, #E5EBFF, transparent 70%)" }}
          />
          <div
            className="absolute -bottom-40 -right-20 size-[500px] rounded-full blur-3xl opacity-[0.08]"
            style={{ background: "radial-gradient(circle, #2258F4, transparent 70%)" }}
          />

          <div className="relative">
            <h2 className="tracking-tight text-[#1A1C24] text-[clamp(2rem,5.5vw,4.5rem)] mb-8">
              联系方式
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
              {links.map((l, i) => {
                const Icon = l.icon;
                const Content = (
                  <>
                    <div className="flex items-center gap-4">
                      <div className="inline-flex size-11 items-center justify-center rounded-xl bg-[#F5F5F7] border border-[#E6E7EB] text-[#4E525E] group-hover:border-[#2258F4] group-hover:bg-[#2258F4] group-hover:text-white transition-colors">
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <div className="text-[10px] tracking-widest text-[#696D7A]">
                          {l.label}
                        </div>
                        <div className="text-base text-[#1A1C24]">{l.value}</div>
                      </div>
                    </div>
                    {l.href && (
                      <ArrowUpRight className="size-5 text-[#696D7A] group-hover:text-[#1A1C24] group-hover:rotate-45 transition-all" />
                    )}
                  </>
                );
                const cls =
                  "group flex items-center justify-between p-5 rounded-[24px] border border-[#E6E7EB] bg-white hover:border-[#CBCDD4] hover:bg-[#FAFBFF] transition-all";
                return (
                  <motion.div
                    key={l.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    {l.href ? (
                      <a href={l.href} className={cls}>
                        {Content}
                      </a>
                    ) : (
                      <div className={cls}>{Content}</div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
