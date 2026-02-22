"use client";

import {useEffect, useMemo, useState} from "react";

import type {ServiceItem} from "@/shared/lib/cms/types";
import type {AudienceRole} from "@/shared/lib/i18n/types";

import type {LandingCopy} from "../model/content";
import {AudienceSwitchSection} from "../sections/audience-switch-section";
import {HeroSection} from "../sections/hero-section";
import {ServicesSection} from "../sections/services-section";

type RoleExperienceProps = {
  copy: LandingCopy;
  services: ServiceItem[];
  defaultRole?: AudienceRole;
};

export function RoleExperience({copy, services, defaultRole = "player"}: RoleExperienceProps) {
  const [role, setRole] = useState<AudienceRole>(defaultRole);

  const filteredServices = useMemo(() => {
    const scoped = services.filter((service) => service.audience.includes(role));
    return scoped.length ? scoped : services;
  }, [role, services]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent<AudienceRole>("aletheia:role-change", {detail: role}));
  }, [role]);

  return (
    <>
      <HeroSection copy={copy} />
      <AudienceSwitchSection
        copy={copy}
        role={role}
        onRoleChange={setRole}
        servicesCount={filteredServices.length}
      />
      <ServicesSection copy={copy} services={filteredServices} />
    </>
  );
}
