function DeleteAccount() {
  return (
    <main className="min-h-screen bg-white text-black px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          Account Deletion
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          Users of the Bunyod App can request deletion of their account
          and associated personal data.
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-2">
              How to Request Account Deletion
            </h2>

            <p className="text-gray-600">
              To request account deletion, please send an email to:
            </p>

            <a
              href="mailto:support@yourdomain.com"
              className="text-blue-600 font-medium underline"
            >
              support@bunyodoptom.uz
            </a>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              What Data Will Be Deleted
            </h2>

            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>User profile information</li>
              <li>Saved addresses</li>
              <li>Order history</li>
              <li>Authentication data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              Data Retention Period
            </h2>

            <p className="text-gray-600">
              All user data will be permanently deleted within
              30 days after the deletion request is confirmed.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

export default DeleteAccount