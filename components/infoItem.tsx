
export default function InfoItem({ icon: Icon, label, value }) {
    return (
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <div className="text-sm text-gray-600">{label}</div>
          <div className="font-medium text-gray-800">{value}</div>
        </div>
      </div>
    );
  }