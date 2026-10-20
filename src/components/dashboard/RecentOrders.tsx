import { orders, type OrderStatus } from '../../data/mock'
import { icons } from '../icons'
import { Badge } from '../ui/Badge'

const statusVariant: Record<OrderStatus, 'success' | 'info' | 'warning' | 'neutral'> = {
  Livrée: 'success',
  'En cours': 'info',
  'En préparation': 'warning',
  Annulée: 'neutral',
}

const portrait = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=80&h=80&q=80&crop=faces`

const photos: Record<string, string> = {
  'Aminata D.': portrait('1580489944761-15a19d654956'),
  'Koffi S.': portrait('1519085360753-af0119f7cbe7'),
  'Sika T.': portrait('1534528741775-53994a69daeb'),
  'Yao M.': portrait('1506794778202-cad84cf45f1d'),
  'Fati B.': portrait('1544005313-94ddf0286df2'),
  'Kouassi A.': portrait('1506277886164-e25aa3f4ef7f'),
  'Nadia B.': portrait('1488426862026-3ee34a7d66df'),
  'Moussa B.': portrait('1519345182560-3f2917c472ef'),
  'Awa K.': portrait('1531123897727-8f129e1688ce'),
  'Ibrahim D.': portrait('1547425260-76bcadfb4f2c'),
  'Clarisse S.': portrait('1494790108377-be9c29b29330'),
  'Paul D.': portrait('1507003211169-0a1dd7228f2d'),
  'Rita G.': portrait('1517841905240-472988babdf9'),
  'Serge D.': portrait('1599566150163-29194dcaad36'),
}

export function RecentOrders({ search }: { search: string }) {
  const query = search.trim().toLowerCase()
  const rows = (
    query
      ? orders.filter((order) =>
          `${order.client} ${order.product}`.toLowerCase().includes(query),
        )
      : orders
  ).slice(0, 5)

  return (
    <div className="rounded-xl bg-white px-[18px] pt-[14px] pb-4 shadow-card">
      <div className="flex h-[22px] items-center justify-between">
        <h2 className="text-[15px] font-bold">Commandes récentes</h2>
        <a
          href="#commandes"
          className="flex items-center gap-1.5 text-[11.5px] font-medium text-[#1f6bff] hover:underline"
        >
          Voir tout
          <icons.arrowRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[430px]">
          <div className="mt-[7px] grid h-7 grid-cols-[116px_141px_81px_1fr] items-center rounded bg-[#f3f7ff] text-[11px] font-semibold text-ink">
            <span>Client</span>
            <span>Produit</span>
            <span>Montant</span>
            <span>Statut</span>
          </div>

          {rows.map((order) => (
            <div
              key={order.id}
              className="grid h-[43px] grid-cols-[116px_141px_81px_1fr] items-center border-b border-[#eef2f9] text-[11px] last:border-0"
            >
              <span className="flex items-center gap-3">
                <span
                  className="block h-7 w-7 shrink-0 overflow-hidden rounded-full"
                  style={{ backgroundImage: order.avatar }}
                >
                  {photos[order.client] ? (
                    <img
                      src={photos[order.client]}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="grid h-full w-full place-items-center text-[10px] font-semibold text-white">
                      {order.initials}
                    </span>
                  )}
                </span>
                {order.client}
              </span>
              <span>{order.product}</span>
              <span>{order.amount}</span>
              <span>
                <Badge variant={statusVariant[order.status]}>{order.status}</Badge>
              </span>
            </div>
          ))}

          {rows.length === 0 ? (
            <p className="py-6 text-center text-[12px] text-mute">
              Aucune commande ne correspond à « {search} ».
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
