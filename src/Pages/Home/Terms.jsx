import { Link } from "react-router"

export default function TermsCondition() {
    const terms = [
        {
            "title": "Acceptance of Terms",
            "desc": "By creating an account, reporting an issue, or using InfraCare services, you acknowledge that you have read, understood, and agree to be legally bound by these Terms and our Privacy Policy."
        },
        {
            "title": "Eligibility & Account Registration",
            "desc": "You must be at least 18 years old to use InfraCare. When registering, you agree to provide accurate information and maintain account security. You are responsible for all activities under your account."
        },
        {
            "title": "Issue Reporting Guidelines",
            "desc": "All reported issues must be genuine public infrastructure problems within municipal jurisdiction. False reports, duplicate submissions, or malicious content may result in account suspension."
        },
        {
            "title": "Photo & Content Submission",
            "desc": "By uploading photos/videos, you grant InfraCare license to use them for issue resolution and transparency purposes. You confirm you have the right to share these materials and they do not violate any laws."
        },
        {
            "title": "Location Data Usage",
            "desc": "InfraCare collects GPS data for accurate issue location. This data is used solely for municipal service purposes and is anonymized in public transparency reports."
        },
        {
            "title": "Government Access & Data Sharing",
            "desc": "Report data is shared with relevant municipal departments for resolution. In emergency situations, data may be shared with additional government agencies as required by law."
        },
        {
            "title": "Premium Services",
            "desc": "Premium users receive priority support. All payments are non-refundable unless service is fundamentally unavailable. Premium features may be modified with 30-day notice."
        },
        {
            "title": "User Conduct & Prohibited Activities",
            "desc": "Users must not: submit false reports, harass municipal staff, attempt unauthorized access, or use the service for commercial purposes without authorization. Violations may lead to legal action."
        },
        {
            "title": "Municipal Responsibility & Limitations",
            "desc": "InfraCare facilitates reporting but does not guarantee issue resolution. Response times and resolution decisions remain at municipal discretion based on available resources and priorities."
        },
        {
            "title": "Privacy & Data Protection",
            "desc": "We comply with data protection laws. Personal data is processed as described in our Privacy Policy. You may request data deletion, except where retention is required by law."
        },
        {
            "title": "Intellectual Property Rights",
            "desc": "InfraCare platform, logo, and content are owned by the developers. Municipal data and public reports remain public property. Users retain rights to their submitted content."
        },
        {
            "title": "Service Availability & Modifications",
            "desc": "InfraCare may temporarily suspend services for maintenance. We reserve the right to modify features or terms with reasonable notice. Continued use constitutes acceptance of changes."
        },
        {
            "title": "Liability Limitations",
            "desc": "InfraCare is not liable for: unresolved issues, municipal decisions, service interruptions, or indirect damages. Maximum liability is limited to fees paid in the last 6 months."
        },
        {
            "title": "Termination of Service",
            "desc": "We may terminate accounts for violation of terms. Users may delete accounts at any time. Historical reports remain in public records as required by municipal regulations."
        },
        {
            "title": "Dispute Resolution",
            "desc": "Disputes will first attempt resolution through municipal grievance channels. Legal disputes shall be governed by Bangladeshi law and settled in Dhaka courts."
        },
        {
            "title": "Grievance Redressal",
            "desc": "Report-related grievances should use in-platform resolution tracking. Platform-related issues contact support@infracare.gov. Response within 7 working days guaranteed."
        },
        {
            "title": "Transparency & Public Records",
            "desc": "Non-personal issue data is publicly accessible via transparency portal. Personal data is protected. Municipalities may publish resolution statistics and performance metrics."
        },
        {
            "title": "Emergency Situations",
            "desc": "For life-threatening emergencies, contact emergency services directly (999). InfraCare is not an emergency response system and should not be used as such."
        },
        {
            "title": "Third-Party Integrations",
            "desc": "InfraCare may integrate with municipal systems and payment gateways. We are not responsible for third-party services but will assist with integration issues."
        },
        {
            "title": "Contact Information",
            "desc": "For terms inquiries: legal@infracare.gov. Municipal authorities contact: gov-relations@infracare.gov. Citizen support: support@infracare.gov or 1800-INFRA-CARE."
        }
    ]
    return (
        <main className="my-12">
            <h1 className="text-3xl font-bold text-emerald-950 text-center mb-10">Terms & Conditions</h1>
            <dl className="w-5/6 mx-auto text-start space-y-3">
                {
                    terms.map((e, i) => (
                        <div key={i} className="space-y-3 my-5">
                            <dt className="font-bold text-xl capitalize text-emerald-950">• {e.title}:</dt>
                            <dd className="text-gray-800 text-sm font-medium ml-4">{e.desc}</dd>
                        </div>
                    ))
                }
                <div className="space-y-3 my-5">
                    <dt className="font-bold text-xl capitalize text-emerald-950">• Contact Us:</dt>
                    <dd className="text-gray-800 text-sm font-medium ml-4">
                        <p>If you have any questions about these Terms, please contact us at:</p>
                        <Link to="/contact" className="text-blue-600 hover:underline" >Help Center</Link>
                    </dd>
                </div>
            </dl>
        </main>
    )
}