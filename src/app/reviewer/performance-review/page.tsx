'use client';
import useSuccessModal from '@/components/context/sucess-box';
import Avatars from '@/components/reuseable/avater';
import { CloseBtn, CloseIcon } from '@/components/reuseable/btn';
import Modal2 from '@/components/reuseable/modal2';
import { Pagination } from '@/components/reuseable/pagination';
import { CustomTable } from '@/components/reuseable/table';
import { TableNoItem } from '@/components/reuseable/table-no-item';
import { TableSkeleton } from '@/components/reuseable/table-skeleton';
import { Button, TableCell, TableRow, Textarea } from '@/components/ui';
import Navber from '@/components/view/common/dash/navber';
import SearchBox from '@/components/view/common/search-box';
import FavIcon from '@/icon/favIcon';
import Image from 'next/image';
import React from 'react';
import calendar from '@/assets/calendar.svg';
import { getSocial } from '@/icon/utils';
import { ImgBox } from '@/components/reuseable/Img-box';
import { helpers, PlaceholderImg } from '@/lib';
import { useModalState } from '@/hooks/useModalState';
import { ImageGallery } from '@/components/reuseable/image-gallery';
import CopyBox from '@/components/reuseable/copy-box';
import { useGetPerformQuery, usePerformRejectMutation, usePerformReportMutation, usePerfromAppMutation } from '@/redux/api/reviewer/performApi';
import { useFormFields, useGlobalState } from '@/hooks';
import { useDebounce } from 'use-debounce';
import FlagBox from '@/components/reuseable/flag-box';
import { DateBox, SocialBox } from '@/components/reuseable/social';
import { CircleAlert } from 'lucide-react';

const intState = {
  isPreview: false,
  isReject: false,
  isReport: false,
  isSocail: false,
}

const initGlobal: any = {
  page: 1,
  search: "",
  details: {},
}

export default function PerformanceReview() {
  const [state, updateState] = useModalState(intState);
  const { openSucc } = useSuccessModal();
  const [global, setGlobal] = useGlobalState(initGlobal)
  const [value] = useDebounce(global.search, 1000);
  const headers = ['Performers', "Task Creator", 'Task Type', "Quantity", 'Action'];
  const [perfromApp, { isLoading: appLoading }] = usePerfromAppMutation()
  const [performReject, { isLoading: rejectLoading }] = usePerformRejectMutation()
  const [performReport, { isLoading: reportLoaing }] = usePerformReportMutation()
  const { data: perform, isLoading } = useGetPerformQuery({
    page: global.page,
    ...(value && { search: value }),
  })
  const id = global?.details?.id
  const images = ['/photo.jpg', '/photo.jpg', '/photo.jpg'];

  //  === reportForm ===
  const reportForm = useFormFields({
    report: '',
  });

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = reportForm.validate({
      report: 'Report is required',
    });
    if (!ok) return;
    try {
      const value = { rejection_reason: reportForm.formData.report, _method: 'PUT' }
      const data = helpers.fromData(value);
      const res = await performReport({ id, data }).unwrap();
      if (res.status) {
        updateState('isReport', false);
        reportForm.reset();
      }
    } catch (err: any) {
      reportForm.setError("report", err?.data?.message)
    }
  };
  //  === rejectForm ===
  const rejectForm = useFormFields({
    rejection: '',
  });

  const handleSubmitReject = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = rejectForm.validate({
      rejection: 'Rejection is required',
    });
    if (!ok) return;
    try {
      const value = { rejection_reason: rejectForm.formData.rejection, _method: 'PUT' }
      const data = helpers.fromData(value);
      const res = await performReject({ id, data }).unwrap();
      if (res.status) {
        updateState('isReject', false);
        rejectForm.reset();
      }
    } catch (err: any) {
      rejectForm.setError("rejection", err?.data?.message)
    }
  };



  return (
    <div>
      <Navber
        title="Performance Review"
        props={
          <>
            <SearchBox placeholder="Search here" onSearch={(text: any) => setGlobal("search", text)} />
          </>
        }
      />
      <div>
        <CustomTable headers={headers}>
          {isLoading ? (
            <TableSkeleton colSpan={headers?.length} tdStyle="!pl-0" />
          ) : perform?.data?.length > 0 ? (
            perform?.data?.map((item: any, index: any) => (
              <TableRow key={index}>
                <TableCell className="relative">
                  <div className="flex items-center gap-3">
                    <Avatars
                      src={helpers.imgSource(item.performer?.avatar) || "/avater.png"}
                      fallback={item?.performer?.name}
                      alt={item?.performer?.name}
                      fallbackStyle="avatar"
                    />
                    <span>{item?.performer?.name}</span>
                  </div>
                </TableCell>
                <TableCell className="relative">
                  <div className="flex items-center gap-3">
                    <Avatars
                      src={helpers.imgSource(item?.creator?.avatar) || "/avater.png"}
                      fallback={item?.creator?.name}
                      alt={item?.creator?.name}
                      fallbackStyle="avatar"
                    />
                    <span>{item?.creator?.name}</span>
                  </div>
                </TableCell>
                <TableCell>{item?.engagement?.engagement_name}</TableCell>
                <TableCell>{item?.task?.quantity}</TableCell>
                <TableCell>
                  <h1
                    onClick={() => {
                      updateState('isPreview', true)
                      setGlobal("details", item)
                    }}
                    className="flex justify-center cursor-pointer"
                  >
                    {' '}
                    <FavIcon name="eye" />
                  </h1>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableNoItem
              colSpan={headers?.length}
              title="No Performance are available at the moment"

            />
          )}
        </CustomTable>
        <Pagination onClick={(v: any) => setGlobal("page", v)} {...perform?.meta}></Pagination>
      </div>
      {/* ===== account varification prieview======= */}
      <Modal2
        open={state.isPreview}
        setIsOpen={(v) => updateState('isPreview', v)}
        style={`${state.isSocail || state.isReject || state.isReport ? '!opacity-0' : ''}`}
      >
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Avatars src={helpers.imgSource(global?.details?.creator?.avatar) || '/avater.png'} fallback={global?.details?.creator?.name} alt="Star Bucks" fallbackStyle="avatar" />
              <ul className="*:leading-5">
                <li className="text-xl">{global?.details?.creator?.name}</li>
                <li className="text-sm text-figma-gray">{helpers.formatDate(global?.details?.creator?.created_at)}</li>
              </ul>
            </div>

            <h1>
              <CloseIcon className="static" onClose={() => updateState('isPreview', false)} />
            </h1>
          </div>
          <div>
            <h1 className="font-semibold text-xl mb-2">{global?.details?.engagement?.engagement_name}</h1>
            <p className="text-figma-gray">
              {global?.details?.engagement?.description}
            </p>
          </div>
          <Button
            className="w-full"
            variant="primary"
            onClick={() => updateState('isSocail', true)}
          >
            User Social
          </Button>
          <ul className="space-y-2 [&>li]:flex [&>li]:items-center [&>li]:justify-between">
            <li>
              <span>Quantity</span>
              <span>{global?.details?.task?.quantity || 0}</span>
            </li>
            <li>
              <span>Selected Audience</span>
              <FlagBox href={helpers.imgSource(global?.details?.country?.flag) || '/blur.png'} name={global?.details?.country?.name} />
            </li>
            <li>
              <span>Per user earned Tokens</span>
              <span className="flex items-center">
                <FavIcon name="coin" className="mr-1 size-5" />
                {global?.details?.task?.total_token || 0}
              </span>
            </li>
            <li>
              <span>Platform</span>
              <SocialBox href={global?.details?.social_task?.icon_url} name={global?.details?.social_task?.name} />
            </li>
            <li>
              <span>Creation Date</span>
              <DateBox date={global?.details?.task?.created_at} />
            </li>
            <li>
              <span>Link</span>
              <CopyBox value={global?.details?.task?.link} />
            </li>
            <li className='mt-4'>
              <ImageGallery images={global?.details?.task_attached?.map((img: any) => img?.file_url)}>
                <div className="grid grid-cols-4 gap-10">
                  {global?.details?.task_attached?.slice(0, 4)?.map((item: any, index: any) => (
                    <ImgBox key={index} src={helpers.imgSource(item?.file_url) || "/blur.png"} alt="photo2" className="w-[70px] h-[100px] mx-auto" />
                  ))}
                </div>
              </ImageGallery>
            </li>
          </ul>

          <div className="space-y-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <Button
                onClick={() => updateState('isReport', true)}
                size="lg"
                variant="secondary"
                className="w-full text-figma-red"
              >
                Report User to Admin
              </Button>
              <Button
                onClick={() => updateState('isReject', true)}
                size="lg"
                variant="secondary"
                className="w-full text-figma-red"

              >
                Reject
              </Button>
            </div>
            <Button
              onClick={async () => {
                const res = await perfromApp(id).unwrap();
                console.log(res)
                if (res?.status) {
                  const { close } = await openSucc({
                    title: 'Successfully',
                    description: 'You approved the task',
                  });
                  const timer = setTimeout(() => {
                    close();
                    updateState('isPreview', false);
                    clearTimeout(timer);
                  }, 2000);
                }
              }}
              disabled={appLoading}
              size="lg"
              variant="primary"
              className="w-full"
            >
              Approve
            </Button>
          </div>
        </div>
      </Modal2>
      {/* ========User social======== */}
      <Modal2
        open={state.isSocail}
        setIsOpen={(v) => updateState('isSocail', v)}
        className="sm:max-w-sm"
      >
        <div>
          <ImgBox src={helpers.imgSource(global?.details?.social?.profile_image) || PlaceholderImg()} className="w-full h-[250px]" alt="imgbox1"></ImgBox>
          <ul className="*:text-lg my-3">
            <li>
              <span className="text-figma-gray">Username: </span>{global?.details?.social?.profile_name}
            </li>
            <li>
              {' '}
              <span className="text-figma-gray">Notes: </span>{global?.details?.social?.note}</li>
          </ul>
          {/* performer takle checkbox show hobe */}
          <CloseBtn className="bg-figma-primary" onClose={() => updateState('isSocail', false)} />
        </div>
      </Modal2>
      {/* ===== Cause of report======= */}
      <Modal2
        open={state.isReport}
        setIsOpen={(v) => updateState('isReport', v)}
        className="sm:max-w-sm"
      >
        <form onSubmit={handleSubmitReport} className="space-y-4">
          <h1 className="font-medium text-xl">Cause of report</h1>
          <div>
            <Textarea
              className="resize-none min-h-30 mt-3 bg-figma-blacks border-none"
              placeholder="Write additional note"
              value={reportForm.formData.report}
              onChange={(e) => reportForm.change('report', e.target.value)}
            />
            {reportForm?.errors?.report && (
              <p className="text-red-500 flex justify-end items-center text-right">
                <span className="mr-1"> {reportForm?.errors?.report}</span>{' '}
                <CircleAlert size={14} />
              </p>
            )}
          </div>
          <CloseBtn onClose={() => {
            updateState('isReport', false)
            reportForm.reset()
          }} />

          <Button disabled={reportLoaing} variant="primary" className="w-full">
            Send
          </Button>
        </form>
      </Modal2>
      {/* =====Cause of rejection======= */}
      <Modal2
        open={state.isReject}
        setIsOpen={(v) => updateState('isReject', v)}
        className="sm:max-w-sm"
      >
        <form onSubmit={handleSubmitReject} className="space-y-4">
          <h1 className="font-medium text-xl">Cause of rejection</h1>
          <div>
            <Textarea
              className="resize-none min-h-30 mt-3 bg-figma-blacks border-none"
              placeholder="Write additional note"
              value={rejectForm.formData.rejection}
              onChange={(e) => rejectForm.change('rejection', e.target.value)}
            />
            {rejectForm?.errors?.rejection && (
              <p className="text-red-500 flex justify-end items-center text-right">
                <span className="mr-1"> {rejectForm?.errors?.rejection}</span>{' '}
                <CircleAlert size={14} />
              </p>
            )}
          </div>
          <CloseBtn onClose={() => {
            updateState('isReject', false)
            rejectForm.reset()
          }} />

          <Button disabled={rejectLoading} variant="primary" className="w-full">
            Send
          </Button>
        </form>
      </Modal2>
    </div>
  );
}
