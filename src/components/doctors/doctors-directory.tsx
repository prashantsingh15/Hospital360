"use client";

import * as React from "react";
import { SearchX } from "lucide-react";
import { departments, doctors } from "@/data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { DoctorCard } from "@/components/cards/doctor-card";
import { Reveal } from "@/components/shared/reveal";

type SortKey = "featured" | "experience" | "fee-asc" | "fee-desc";

const departmentNames = new Map(
  departments.map((department) => [department.slug, department.name])
);

export function DoctorsDirectory() {
  const [query, setQuery] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [sort, setSort] = React.useState<SortKey>("featured");

  const filtered = React.useMemo(() => {
    const term = query.trim().toLowerCase();

    let list = doctors.filter((doctor) => {
      if (department && doctor.department !== department) return false;
      if (!term) return true;
      const haystack = [
        doctor.name,
        doctor.designation,
        departmentNames.get(doctor.department) ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });

    if (sort === "experience") {
      list = [...list].sort((a, b) => b.experienceYears - a.experienceYears);
    } else if (sort === "fee-asc") {
      list = [...list].sort((a, b) => a.consultationFee - b.consultationFee);
    } else if (sort === "fee-desc") {
      list = [...list].sort((a, b) => b.consultationFee - a.consultationFee);
    }

    return list;
  }, [query, department, sort]);

  function clearFilters() {
    setQuery("");
    setDepartment("");
    setSort("featured");
  }

  return (
    <div>
      {/* Filter bar */}
      <Card className="mb-10 flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center">
        <div className="flex-1">
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or speciality…"
            aria-label="Search doctors by name or speciality"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:w-auto lg:min-w-[26rem]">
          <Select
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            aria-label="Filter by department"
          >
            <option value="">All Departments</option>
            {departments.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </Select>
          <Select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            aria-label="Sort doctors"
          >
            <option value="featured">Featured</option>
            <option value="experience">Experience</option>
            <option value="fee-asc">Fee: Low to High</option>
            <option value="fee-desc">Fee: High to Low</option>
          </Select>
        </div>
      </Card>

      {/* Results */}
      <p className="mb-6 text-sm text-muted" aria-live="polite">
        Showing {filtered.length} specialist{filtered.length === 1 ? "" : "s"}
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((doctor, index) => (
          <Reveal key={doctor.id} delay={(index % 4) * 0.05} className="h-full">
            <DoctorCard
              doctor={doctor}
              departmentName={departmentNames.get(doctor.department)}
            />
          </Reveal>
        ))}

        {filtered.length === 0 ? (
          <div className="col-span-full flex flex-col items-center py-20 text-center">
            <SearchX className="size-12 text-muted" aria-hidden />
            <p className="mt-4 font-display text-lg font-semibold">
              No doctors match your filters
            </p>
            <p className="mt-1 text-sm text-muted">
              Try a different name, speciality or department.
            </p>
            <Button variant="ghost" className="mt-6" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
