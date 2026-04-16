import logo from "../../assets/images/ifda-logo.png";

export default function JuryComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white via-red-50 to-red-100">
      <h1 className="text-4xl font-bold mb-4 text-red-600">Jury Panel - Coming Soon</h1>
      <p className="text-lg text-gray-700 mb-8">Details about the Jury Panel will be revealed soon. Stay tuned!</p>
      <img src={logo} alt="IFDA Logo" className="h-24 w-auto mb-4" decoding="async" />
    </div>
  );
}
