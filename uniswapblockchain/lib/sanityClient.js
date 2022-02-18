import sanityClient from "@sanity/client"

export const client = sanityClient({
    projectId: "2ka5z8zh",
    dataset: "production",
    apiVersion: "v1",
    token:
        "sk0xBoIcMLac1CK8q9DM2STyZZU7cT4OTDG7yig621CpkEmPZkK0PXyrfiNPgPLG42GcZRAlCJ3yhehYJx8omQgHzVuJuFwvygHtoZWJGeIAensyNyesUXMdcU604x60XYVp5joCiD6Jb331FUPA20S6NJIWoMJEoG1anmFBup9l48mM8p1H",
    useCdn: false,
})