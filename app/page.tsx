'use client';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-text-primary">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-6xl mb-6 text-accent">
            Si la forma de tus orejas te ha robado la confianza, recuperala para siempre.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-text-secondary">
            Protocolo de Otomodelacion Definitiva con Anclaje Estructural del Dr. Hector. La solucion segura para un resultado natural y permanente.
          </p>
          <div className="aspect-video bg-surface rounded-neumorphic mb-8 flex items-center justify-center">
            <p className="text-text-secondary">Video de presentacion</p>
          </div>
          <button className="bg-accent text-background px-8 py-4 rounded-neumorphic text-lg font-bold hover:opacity-90 transition">
            Agendar Videollamada Gratuita
          </button>
          <p className="mt-4 text-sm text-text-secondary">+5.100 cirugias faciales realizadas con exito</p>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-8 px-4 bg-surface/50">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-8 flex-wrap opacity-70">
          <div className="text-center">
            <p className="text-sm">⭐ 4.9 estrellas - Pacientes Satisfechos</p>
          </div>
          <div className="text-center">
            <p className="text-sm">🎓 Diplomado Anatomia PUC</p>
          </div>
          <div className="text-center">
            <p className="text-sm">👨‍🏫 Docente en Medicina Estetica</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl text-center mb-12 text-accent">
            Historias Reales: La Libertad de No Volver a Esconderse
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface rounded-neumorphic p-6">
              <div className="aspect-video bg-background rounded-lg mb-4 flex items-center justify-center">
                <p className="text-text-secondary">Testimonio Javier L.</p>
              </div>
              <p className="text-lg mb-4">"Rechace un trabajo por no cortarme el pelo. Despues del Dr. Hector, mi vida cambio. Es libertad."</p>
              <p className="text-sm text-text-secondary">⭐⭐⭐⭐⭐</p>
            </div>
            <div className="bg-surface rounded-neumorphic p-6">
              <div className="aspect-video bg-background rounded-lg mb-4 flex items-center justify-center">
                <p className="text-text-secondary">Testimonio Daniela P.</p>
              </div>
              <p className="text-lg mb-4">"El resultado es increiblemente natural. Nadie nota que me opere, solo ven que me veo mejor y mas segura."</p>
              <p className="text-sm text-text-secondary">⭐⭐⭐⭐⭐</p>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Section */}
      <section className="py-16 px-4 bg-surface/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="aspect-square bg-background rounded-neumorphic flex items-center justify-center">
            <p className="text-text-secondary">Foto Dr. Hector</p>
          </div>
          <div>
            <h2 className="font-serif text-3xl md:text-4xl mb-6 text-accent">
              Conoce al Dr. Hector: El Especialista Detras de tu Confianza
            </h2>
            <p className="text-lg mb-4 text-text-secondary">
              Cirujano Dentista, Especialista en Estetica Orofacial y Otomodelacion
            </p>
            <ul className="space-y-3 mb-6">
              <li>✓ Cirujano Dentista, Universidad San Sebastian</li>
              <li>✓ Diplomado en Anatomia de Cabeza y Cuello, PUC</li>
              <li>✓ Formacion avanzada en Ortodoncia y Estetica Orofacial</li>
              <li>✓ Docente en medicina estetica y referente en otomodelacion</li>
            </ul>
            <p className="text-lg italic">
              "Entiendo perfectamente que esto no es un problema superficial. Es una inseguridad que afecta tu vida. Mi compromiso es darte una solucion definitiva y natural."
            </p>
            <p className="text-sm mt-2 text-accent">— Dr. Hector</p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl text-center mb-12 text-accent">
            Tu Camino Hacia un Perfil de Confianza
          </h2>
          <div className="space-y-6">
            {[
              { step: 1, title: 'Evaluacion de Viabilidad Gratuita', desc: 'En una videollamada, el Dr. Hector evalua tu caso y resuelve todas tus dudas, sin compromiso.' },
              { step: 2, title: 'Simulacion 3D y Planificacion', desc: 'Visualizas tu resultado final en una simulacion 3D antes de decidir. Cero sorpresas.' },
              { step: 3, title: 'Procedimiento con Anclaje Estructural', desc: 'El Dr. Hector realiza el procedimiento minimamente invasivo con sedacion consciente para tu confort.' },
              { step: 4, title: 'Libertad y Confianza Definitiva', desc: 'Disfruta tu nueva vida, sin limitaciones y con la seguridad que siempre quisiste.' }
            ].map((item) => (
              <div key={item.step} className="bg-surface rounded-neumorphic p-6 flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent text-background rounded-full flex items-center justify-center font-bold text-xl">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-text-secondary">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Form */}
      <section className="py-16 px-4 bg-surface/50">
        <div className="max-w-lg mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-6 text-accent">
            Da el Primer Paso Hacia tu Perfil de Confianza
          </h2>
          <p className="text-center text-text-secondary mb-8">
            Agenda tu videollamada de evaluacion gratuita y sin compromiso con el Dr. Hector.
          </p>
          <form className="space-y-4">
            <input type="text" placeholder="Tu Nombre" className="w-full px-4 py-3 bg-background rounded-neumorphic text-text-primary" required />
            <input type="tel" placeholder="Tu Telefono (WhatsApp)" className="w-full px-4 py-3 bg-background rounded-neumorphic text-text-primary" required />
            <input type="email" placeholder="Tu Email" className="w-full px-4 py-3 bg-background rounded-neumorphic text-text-primary" required />
            <button type="submit" className="w-full bg-accent text-background px-8 py-4 rounded-neumorphic text-lg font-bold hover:opacity-90 transition">
              Agendar mi Videollamada Gratuita
            </button>
          </form>
          <p className="text-center text-sm text-text-secondary mt-4">Tu informacion es 100% confidencial.</p>
        </div>
      </section>
    </main>
  );
}
