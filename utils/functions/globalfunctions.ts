export function formatDateToShort(dateValue?: string | null) {
  if (!dateValue) return '-'
  const d = new Date(dateValue)
  if (Number.isNaN(d.getTime())) return '-'
  const day = d.getDate()
  const month = d.toLocaleString('en-US', { month: 'short' })
  const year = d.getFullYear()
  return `${day} ${month}, ${year}`
}

export function formatDateTime(dateValue?: string | null) {
  if (!dateValue) return '-'
  const d = new Date(dateValue)
  if (Number.isNaN(d.getTime())) return '-'
  const day = d.getDate()
  const month = d.toLocaleString('en-US', { month: 'short' }) // e.g. "Oct"
  const year = d.getFullYear()
  let hours = d.getHours()
  const minutes = d.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  if (hours === 0) hours = 12
  const minuteStr = String(minutes).padStart(2, '0')
  const hourStr = String(hours)
  return `${day} ${month}, ${year} ${hourStr}.${minuteStr}${ampm}`
}

export function formatDateTimeWithSeconds(dateValue?: string | null) {
  if (!dateValue) return '-'

  // Normalize fractional seconds to milliseconds so Date can parse reliably.
  // Handles inputs like "2025-11-03T03:26:30.702756Z"
  const m = String(dateValue).match(/(.*T\d{2}:\d{2}:\d{2})(\.(\d+))?(Z|[+\-].+)?$/)
  if (!m) return '-'

  const base = m[1] // "2025-11-03T03:26:30"
  let frac = m[3] ?? '' // "702756" or undefined
  const tz = m[4] ?? 'Z' // timezone part or default Z

  if (frac.length > 3) frac = frac.slice(0, 3)
  else if (frac.length < 3) frac = frac.padEnd(3, '0')

  const iso = frac ? `${base}.${frac}${tz}` : `${base}${tz}`

  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '-'

  const day = d.getDate()
  const month = d.toLocaleString('en-US', { month: 'short' })
  const year = d.getFullYear()

  let hours = d.getHours()
  const minutes = d.getMinutes()
  const seconds = d.getSeconds()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const hour12 = hours % 12 === 0 ? 12 : hours % 12

  const hourStr = String(hour12).padStart(2, '0')
  const minuteStr = String(minutes).padStart(2, '0')
  const secondStr = String(seconds).padStart(2, '0')

  return `${day} ${month}, ${year} ${hourStr}:${minuteStr}:${secondStr} ${ampm}`
}


export const formatDateForExcel = (v: any): string => {
    if (!v) return '';
    const d = new Date(v);
    if (Number.isNaN(d.getTime())) return '';
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };

export const getInitials = (userData?: { name?: string; username?: string }) => {
    const source = (userData?.name ?? userData?.username ?? '').toString().trim();
    if (!source) return 'NA';
    return source.slice(0, 2).toUpperCase();
  };

export const TAG_STYLES = [
  'bg-blue-100 text-blue-800 ring-1 ring-blue-200',
  'bg-green-100 text-green-800 ring-1 ring-green-200',
  'bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200',
  'bg-red-100 text-red-800 ring-1 ring-red-200',
  'bg-purple-100 text-purple-800 ring-1 ring-purple-200',
  'bg-pink-100 text-pink-800 ring-1 ring-pink-200',
  'bg-indigo-100 text-indigo-800 ring-1 ring-indigo-200',
  'bg-teal-100 text-teal-800 ring-1 ring-teal-200',
];

export function pickTagStyle(value: string, styles = TAG_STYLES) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  const idx = Math.abs(hash) % styles.length;
  return styles[idx];
}


