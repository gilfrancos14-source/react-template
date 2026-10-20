import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { sales } from '../../data/mock'

export function SalesDonut() {
  return (
    <div className="rounded-xl bg-white px-[22px] pt-[19px] pb-4 shadow-card">
      <h2 className="flex h-[29px] items-center text-[17px] font-bold">
        Répartition des ventes
      </h2>

      <div className="mt-[19px] flex flex-wrap items-start gap-x-8 gap-y-4">
        <div className="relative ml-1 h-[188px] w-[188px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sales}
                dataKey="value"
                nameKey="label"
                innerRadius={62}
                outerRadius={93}
                startAngle={90}
                endAngle={-270}
                stroke="none"
                paddingAngle={1}
              >
                {sales.map((slice) => (
                  <Cell key={slice.label} fill={slice.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}%`, 'Part']}
                contentStyle={{
                  borderRadius: 10,
                  border: '1px solid #e6edf9',
                  boxShadow: '0 8px 24px rgba(20,60,160,.12)',
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 grid place-items-center text-center text-[17px] leading-6 font-semibold text-ink">
            <span>
              1 250 000
              <br />
              FCFA
            </span>
          </div>
        </div>

        <ul className="mt-[9px] flex min-w-[190px] flex-1 flex-col">
          {sales.map((slice) => (
            <li
              key={slice.label}
              className="flex h-[41px] items-center gap-4 text-[13.5px]"
            >
              <span
                className="h-[13px] w-[13px] rounded-full"
                style={{ backgroundColor: slice.color }}
              />
              <span className="flex-1">{slice.label}</span>
              <b className="font-semibold">{slice.value}%</b>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
