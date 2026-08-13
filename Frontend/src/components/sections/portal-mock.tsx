import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  MessageSquare,
  FileText,
  Wallet,
  CheckCircle2,
  Clock,
  Activity,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView, useReducedMotion } from "@/hooks/use-motion";
import { CountUp } from "@/components/motion/count-up";
import { PORTAL } from "@/lib/constants";

const NAV = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Projects", icon: FolderKanban },
  { label: "Team", icon: Users },
  { label: "Messages", icon: MessageSquare },
  { label: "Documents", icon: FileText },
  { label: "Finance", icon: Wallet },
];

const STAT_CARDS = [
  { value: 12, label: "Active Projects", icon: Activity, prefix: "", suffix: "" },
  { value: 8, label: "Team Members", icon: Users, prefix: "", suffix: "" },
  { value: 4.2, label: "Pending Invoices", icon: DollarSign, prefix: "$", suffix: "k" },
];

const PROJECTS = [
  { name: "Q3 Marketing Campaign", progress: 78, status: "In Progress", due: "Aug 15" },
  { name: "Website Redesign Launch", progress: 92, status: "Review", due: "Aug 10" },
  { name: "Client Portal Setup", progress: 45, status: "In Progress", due: "Aug 22" },
];

const MESSAGES = [
  { from: "Sarah Chen", body: "Invoice approved — thanks!", time: "2m" },
  { from: "Dev Team", body: "Staging build is up for review.", time: "14m" },
  { from: "Alex Rivera", body: "Documents signed and uploaded.", time: "1h" },
];

const INVOICES = [
  { name: "Invoice #1042", amount: "$1,850", status: "Paid" },
  { name: "Invoice #1043", amount: "$2,350", status: "Pending" },
  { name: "August retainer", amount: "$4,200", status: "Scheduled" },
];

const TABS = ["Projects", "Messages", "Finance"] as const;
type Tab = (typeof TABS)[number];

/** Status pills reuse the semantic tints already used elsewhere on the site. */
const statusTone: Record<string, string> = {
  "In Progress": "bg-accent/10 text-accent",
  Review: "bg-amber-100 text-amber-700",
  Paid: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Scheduled: "bg-accent/10 text-accent",
};

/**
 * A mock of the portal product, framed as a browser window. Everything inside
 * animates once it scrolls into view: figures count, progress bars fill, the
 * tabs cycle on their own, and a notification slides in on a loop - so the
 * screenshot reads as a running product rather than a still image.
 */
export function PortalMock() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });
  const reduced = useReducedMotion();

  const [tab, setTab] = useState<Tab>("Projects");
  const [paused, setPaused] = useState(false);
  const [toast, setToast] = useState(false);

  // Cycle the tabs so the mock demonstrates more than one screen.
  useEffect(() => {
    if (!inView || reduced || paused) return;
    const timer = window.setInterval(() => {
      setTab((current) => TABS[(TABS.indexOf(current) + 1) % TABS.length]);
    }, 3800);
    return () => window.clearInterval(timer);
  }, [inView, reduced, paused]);

  // Slide the notification in shortly after arrival, then on a slow loop.
  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setToast(true);
      return;
    }
    const timers: number[] = [];
    const show = () => {
      setToast(true);
      timers.push(window.setTimeout(() => setToast(false), 4200));
    };
    timers.push(window.setTimeout(show, 1200));
    const loop = window.setInterval(show, 11000);
    return () => {
      timers.forEach(window.clearTimeout);
      window.clearInterval(loop);
    };
  }, [inView, reduced]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Glow sitting under the window. */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-blue-600/20 via-accent/10 to-indigo-600/20 blur-2xl animate-glow-pulse"
      />

      <div className="rounded-xl overflow-hidden border border-border/60 bg-background shadow-custom">
        {/* Browser chrome */}
        <div className="flex items-center gap-3 border-b bg-muted/40 px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="flex-1 rounded-md bg-background px-3 py-1 text-center text-[11px] text-muted-foreground">
            {PORTAL.demoUrl}
          </div>
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 animate-pulse-ring" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live
          </span>
        </div>

        <div className="flex min-h-[420px]">
          {/* Sidebar */}
          <aside className="hidden w-[38%] max-w-[190px] shrink-0 bg-primary p-4 sm:block">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
              {PORTAL.workspaceLabel}
            </p>
            <nav className="space-y-1">
              {NAV.map((item, index) => {
                const Icon = item.icon;
                const active = index === 0;
                return (
                  <div
                    key={item.label}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-2.5 py-2 text-[13px] transition-colors duration-300",
                      active
                        ? "bg-accent text-white font-medium shadow-sm"
                        : "text-white/60 hover:bg-white/5 hover:text-white/90",
                    )}
                    style={
                      inView && !reduced
                        ? { animation: `fade-up .5s cubic-bezier(.22,1,.36,1) ${index * 70 + 200}ms both` }
                        : undefined
                    }
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    {item.label}
                  </div>
                );
              })}
            </nav>
          </aside>

          {/* Workspace */}
          <div className="min-w-0 flex-1 p-4 sm:p-5">
            <div className="mb-4">
              <p className="font-semibold text-primary">{PORTAL.greeting}</p>
              <p className="text-xs text-muted-foreground">{PORTAL.greetingSub}</p>
            </div>

            {/* Stat cards */}
            <div className="mb-4 grid grid-cols-3 gap-2 sm:gap-3">
              {STAT_CARDS.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-border/60 bg-card p-2.5 transition-shadow duration-300 hover:shadow-sm"
                    style={
                      inView && !reduced
                        ? { animation: `fade-up .6s cubic-bezier(.22,1,.36,1) ${index * 110 + 260}ms both` }
                        : undefined
                    }
                  >
                    <Icon className="mb-1.5 h-3.5 w-3.5 text-accent" />
                    <p className="text-base font-bold leading-none text-primary sm:text-lg">
                      {inView ? (
                        <CountUp
                          to={stat.value}
                          prefix={stat.prefix}
                          suffix={stat.suffix}
                          decimals={stat.value % 1 === 0 ? 0 : 1}
                          duration={1400}
                        />
                      ) : (
                        <span className="tabular">0</span>
                      )}
                    </p>
                    <p className="mt-1 text-[10px] leading-tight text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Tabs */}
            <div className="mb-3 flex gap-1.5">
              {TABS.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setTab(name)}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors duration-300",
                    tab === name
                      ? "bg-accent text-white"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  {name}
                </button>
              ))}
            </div>

            {/* Panels. Keyed on the tab so each switch replays its entrance. */}
            <div key={tab} className="space-y-2">
              {tab === "Projects" &&
                PROJECTS.map((project, index) => (
                  <div
                    key={project.name}
                    className="rounded-lg border border-border/60 bg-card p-3"
                    style={
                      reduced
                        ? undefined
                        : { animation: `fade-up .45s cubic-bezier(.22,1,.36,1) ${index * 80}ms both` }
                    }
                  >
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <p className="text-[13px] font-medium text-primary">{project.name}</p>
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
                          statusTone[project.status],
                        )}
                      >
                        {project.status}
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
                        style={{
                          width: inView ? `${project.progress}%` : "0%",
                          transition: reduced
                            ? "none"
                            : `width 1.3s cubic-bezier(.22,1,.36,1) ${index * 130 + 400}ms`,
                        }}
                      />
                    </div>
                    <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground">
                      <span>{project.progress}% complete</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5" />
                        Due {project.due}
                      </span>
                    </div>
                  </div>
                ))}

              {tab === "Messages" &&
                MESSAGES.map((message, index) => (
                  <div
                    key={message.from}
                    className="flex items-start gap-3 rounded-lg border border-border/60 bg-card p-3"
                    style={
                      reduced
                        ? undefined
                        : { animation: `fade-up .45s cubic-bezier(.22,1,.36,1) ${index * 80}ms both` }
                    }
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                      {message.from.charAt(0)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between gap-2">
                        <p className="text-[13px] font-medium text-primary">{message.from}</p>
                        <span className="text-[10px] text-muted-foreground">{message.time}</span>
                      </div>
                      <p className="truncate text-[11px] text-muted-foreground">{message.body}</p>
                    </div>
                  </div>
                ))}

              {tab === "Finance" &&
                INVOICES.map((invoice, index) => (
                  <div
                    key={invoice.name}
                    className="flex items-center justify-between rounded-lg border border-border/60 bg-card p-3"
                    style={
                      reduced
                        ? undefined
                        : { animation: `fade-up .45s cubic-bezier(.22,1,.36,1) ${index * 80}ms both` }
                    }
                  >
                    <div>
                      <p className="text-[13px] font-medium text-primary">{invoice.name}</p>
                      <p className="text-[10px] text-muted-foreground">{invoice.amount}</p>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-medium",
                        statusTone[invoice.status],
                      )}
                    >
                      {invoice.status}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notification, sliding in over the top-right corner. */}
      <div
        className={cn(
          "pointer-events-none absolute right-3 top-14 flex items-center gap-2 rounded-lg border border-border/60 bg-background px-3 py-2 shadow-custom transition-all duration-500 sm:right-4",
          toast ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
        )}
      >
        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
        <div className="leading-tight">
          <p className="text-[10px] text-muted-foreground">Team update</p>
          <p className="text-[11px] font-semibold text-primary">Task completed!</p>
        </div>
      </div>
    </div>
  );
}
