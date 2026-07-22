import type { PreviewController } from '../hooks/usePreview';

const barClass = 'block rounded-[2px] bg-[oklch(0.31_0.008_270)]';

export default function Preview({
  controller,
}: {
  controller: PreviewController;
}) {
  const { rootRef, data, visible } = controller;

  return (
    <div
      ref={rootRef}
      id='preview'
      aria-hidden='true'
      style={{ width: 500, maxWidth: 'calc(100vw - 40px)' }}
      className={`pointer-events-none fixed z-30 ${visible ? 'show' : ''}`}
    >
      <div className='overflow-hidden rounded-[10px] border border-line bg-surface shadow-[0_30px_70px_oklch(0_0_0_/_0.55),0_0_90px_oklch(0.93_0.004_270_/_0.06)]'>
        <div className='flex items-center gap-[5px] border-b border-[oklch(0.29_0.007_270)] px-3 py-[9px]'>
          <i className='size-[7px] rounded-full bg-faint opacity-50' />
          <i className='size-[7px] rounded-full bg-faint opacity-50' />
          <i className='size-[7px] rounded-full bg-faint opacity-50' />
          <span className='ml-2 text-[10.5px] tracking-[0.02em] text-faint'>
            {data?.url}
          </span>
        </div>
        <div className='px-4 pb-[18px] pt-4'>
          <p className='text-[1.08rem] font-semibold tracking-[-0.012em] text-ink'>
            {data?.title}
          </p>
          <p className='mb-[13px] mt-1.5 text-[0.86rem] leading-normal text-muted'>
            {data?.desc}
          </p>
          {data?.image ? (
            <img
              src={data.image}
              alt=''
              className='block aspect-[2/1] w-full rounded-[6px] border border-line/50 object-cover object-top'
            />
          ) : (
            <div className='grid grid-cols-[2fr_1fr] gap-2'>
              <b className={`${barClass} h-11`} />
              <b className={`${barClass} h-11`} />
              <b className={`${barClass} h-3`} />
              <b className={`${barClass} h-3`} />
            </div>
          )}
          <p className='mt-[13px] text-[11px] tracking-[0.02em] text-faint'>
            {data?.tech}
          </p>
        </div>
      </div>
    </div>
  );
}
