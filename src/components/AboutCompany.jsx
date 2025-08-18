export default function AboutCompany() {
  return (
    <section className="py-16 px-8 text-center bg-gray-50">
        <h2 className="text-3xl font-bold text-green-700 mb-10">
          Our Achievements
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="text-3xl font-bold text-green-700">7+</h3>
            <p>Years of Experience</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="text-3xl font-bold text-green-700">350+</h3>
            <p>Properties Delivered</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="text-3xl font-bold text-green-700">900+</h3>
            <p>Satisfied Clients</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="text-3xl font-bold text-green-700">75+</h3>
            <p>Ongoing Projects</p>
          </div>
        </div>
      </section>

  );
}
