import { FaWhatsapp, FaPhoneAlt, FaFacebookF } from "react-icons/fa";

const contactList = [
  { name: "Rahul", number: "+911234567890" },
  { name: "harsh kumar", number: "+911234567891" },
  { name: "kanchan", number: "+911234567892" },
  { name: "priyanshu", number: "+911234567893" },
  { name: "pawan kumar", number: "+911234567894" },
  { name: "sonu kumar", number: "+911234567895" },
  { name: "manish kumar", number: "+918527916820" },
];

function Contacts() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <p className="mb-6">Email: support@stockmanager.com</p>

      <div className="space-y-4">
        {contactList.map((contact, index) => (
          <div
            key={index}
            className="border p-4 rounded-md shadow-sm flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{contact.name}</p>
              <p className="text-gray-600">{contact.number}</p>
            </div>
            <div className="flex space-x-4 text-xl">
              <a
                href={`https://wa.me/${contact.number.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:scale-110 transition"
              >
                <FaWhatsapp />
              </a>
              <a
                href={`tel:${contact.number}`}
                className="text-blue-600 hover:scale-110 transition"
              >
                <FaPhoneAlt />
              </a>
              <a
                href="https://facebook.com/stockmanager" // Optional: update to actual FB page
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-800 hover:scale-110 transition"
              >
                <FaFacebookF />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contacts;
