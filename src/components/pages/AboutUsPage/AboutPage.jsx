import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function AboutUs() {
  // Dummy data for ticket sales graph
  const ticketData = [
    { month: "Jan", tickets: 120 },
    { month: "Feb", tickets: 300 },
    { month: "Mar", tickets: 500 },
    { month: "Apr", tickets: 450 },
    { month: "May", tickets: 600 },
    { month: "Jun", tickets: 750 },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600/30 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600/30 blur-3xl rounded-full -z-10"></div>
      <header className="text-center py-16">
        <h1 className="text-4xl tracking-[0.3em] font-bold">
          About <span className="">Us</span>
        </h1>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          From managing events to powering ticket sales, we build platforms that
          bring people together and create unforgettable experiences.
        </p>
      </header>

      {/* Mission / Vision */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6 pb-16">
        <div className="p-6 rounded-2xl bg-[#1F1F1F] shadow-xl hover:shadow-purple-500/30 transition">
          <h2 className="text-2xl font-semibold mb-3 text-pink-400">
            Our Mission
          </h2>
          <p className="text-gray-300">
            To craft seamless ticketing and event management solutions that are
            fast, secure, and scalable for everyone.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-[#1F1F1F] shadow-xl hover:shadow-blue-500/30 transition">
          <h2 className="text-2xl font-semibold mb-3 text-blue-400">
            Our Vision
          </h2>
          <p className="text-gray-300">
            To be the global leader in event-tech, connecting millions of fans
            and creators while redefining digital experiences.
          </p>
        </div>
      </section>

      {/* Stats & Graph */}
      <section className="max-w-6xl mx-auto px-6 pb-16 grid md:grid-cols-2 gap-12">
        {/* Stats */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-green-400 mb-4">Our Impact</h2>
          <ul className="space-y-3 text-gray-300 text-lg">
            <li>🎟️ <span className="text-white font-semibold">1M+ Tickets</span> Sold</li>
            <li>🎤 <span className="text-white font-semibold">500+ Events</span> Managed</li>
            <li>🌍 <span className="text-white font-semibold">50+ Cities</span> Reached</li>
            <li>⚡ <span className="text-white font-semibold">99.9% Uptime</span> Guaranteed</li>
          </ul>
        </div>

        {/* Graph */}
        <div className="p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-purple-400">
            Ticket Sales Growth
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={ticketData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip contentStyle={{ background: "#222", border: "none" }} />
              <Line
                type="monotone"
                dataKey="tickets"
                stroke="#a855f7"
                strokeWidth={3}
                dot={{ fill: "#a855f7", r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
