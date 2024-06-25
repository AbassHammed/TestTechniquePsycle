import Training from '@/components/Trainings';
import { Test } from '@/lib/constants';

export default function StatData() {
  return (
    <div className="flex-none h-full w-[265px] bg-[#eeeeee] px-6">
      <div className="flex flex-col items-start justify-start my-2 space-y-2">
        <h4 className="text-left uppercase font-medium text-[10px]">Statisques</h4>
        <h2 className="text-left font-medium text-xl">Détection d'acier</h2>
      </div>

      <div className="flex items-center justify-between my-10">
        <div className="flex font-medium flex-col items-center justify-center space-y-2">
          <span className="uppercase text-[#9e9e9e] text-[10px]"> acier (total)</span>
          <h1 className="text-4xl">345</h1>
        </div>
        <div className="flex font-medium flex-col items-center justify-center space-y-2">
          <span className="uppercase text-[#9e9e9e] text-[10px]"> autre (total)</span>
          <h1 className="text-4xl">213</h1>
        </div>
      </div>
      <Training Training={Test} />
    </div>
  );
}
