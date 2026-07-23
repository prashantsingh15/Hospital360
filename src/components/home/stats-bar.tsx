import { stats } from "@/data";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/shared/container";
import { Counter } from "@/components/shared/counter";
import { Reveal } from "@/components/shared/reveal";

export function StatsBar() {
  return (
    <Container className="relative z-10 -mt-16 sm:-mt-20">
      <Card className="grid grid-cols-2 divide-y divide-border rounded-3xl p-2 shadow-lifted sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Reveal
              key={stat.id}
              delay={index * 0.08}
              className="flex flex-col items-center gap-2 p-5 text-center sm:p-7"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              <Counter
                to={stat.value}
                suffix={stat.suffix}
                className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
              />
              <p className="text-sm font-semibold">{stat.label}</p>
              <p className="text-xs text-muted">{stat.description}</p>
            </Reveal>
          );
        })}
      </Card>
    </Container>
  );
}
