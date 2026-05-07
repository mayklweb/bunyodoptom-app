function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white text-black px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-700 mb-6">
          This Privacy Policy explains how Bunyod App
          collects, uses, and protects user information.
        </p>

        <div className="space-y-6 text-gray-600">
          <section>
            <h2 className="text-2xl font-semibold mb-2">
              Information We Collect
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Name</li>
              <li>Phone number</li>
              <li>Delivery address</li>
              <li>Location data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              How We Use Information
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Provide app functionality</li>
              <li>Process orders</li>
              <li>Improve user experience</li>
              <li>Provide customer support</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              Data Protection
            </h2>

            <p>
              All transmitted data is encrypted using secure
              HTTPS connections.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              Contact
            </h2>

            <p>
              If you have questions about this Privacy Policy,
              contact us at:
            </p>

            <a
              href="mailto:support@yourdomain.com"
              className="text-blue-600 underline"
            >
              support@yourdomain.com
            </a>
          </section>
        </div>
      </div>
    </main>
  );
}

export default PrivacyPolicy