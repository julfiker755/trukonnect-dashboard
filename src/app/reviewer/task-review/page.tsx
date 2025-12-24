'use client';
import { CloseBtn, CloseIcon } from '@/components/reuseable/btn';
import useSuccessModal from '@/components/context/sucess-box';
import Avatars from '@/components/reuseable/avater';
import Modal2 from '@/components/reuseable/modal2';
import { Pagination } from '@/components/reuseable/pagination';
import { CustomTable } from '@/components/reuseable/table';
import { TableNoItem } from '@/components/reuseable/table-no-item';
import { TableSkeleton } from '@/components/reuseable/table-skeleton';
import { Button, TableCell, TableRow, Textarea } from '@/components/ui';
import Navber from '@/components/view/common/dash/navber';
import SearchBox from '@/components/view/common/search-box';
import { useModalState } from '@/hooks/useModalState';
import FavIcon from '@/icon/favIcon';
import CopyBox from '@/components/reuseable/copy-box';
import { useGetTaskQuery, useTaskApprovedMutation, useTaskRejectMutation, useTaskReportMutation } from '@/redux/api/reviewer/taskApi';
import { useDebounce } from 'use-debounce';
import { useFormFields, useGlobalState } from '@/hooks';
import { helpers } from '@/lib';
import FlagBox from '@/components/reuseable/flag-box';
import { DateBox, SocialBox } from '@/components/reuseable/social';
import { CircleAlert } from 'lucide-react';


const initState = {
  isReject: false,
  isReport: false,
  isPreview: false,
}

const initGlobal: any = {
  page: 1,
  search: "",
  details: {},
}

export default function TaskReview() {
  const [state, updateState] = useModalState(initState);
  const [global, setGlobal] = useGlobalState(initGlobal)
  const { openSucc } = useSuccessModal();
  const headers = ['Creator', 'Task Type', 'Quantity', 'Action'];
  const [value] = useDebounce(global.search, 1000);
  const { data: task, isLoading } = useGetTaskQuery({
    page: global.page,
    ...(value && { search: value }),
  })
  const [taskApproved, { isLoading: appLoading }] = useTaskApprovedMutation()
  const [taskReject, { isLoading: taskLoading }] = useTaskRejectMutation()
  const [taskReport, { isLoading: reportLoading }] = useTaskReportMutation()
  const id = global?.details?.id


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
      const value = { note: reportForm.formData.report, _method: 'PUT' }
      const data = helpers.fromData(value);
      const res = await taskReport({ id, data }).unwrap();
      if (res.status) {
        updateState('isReport', false);
        updateState("isPreview", false)
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
      const value = { rejection_reason: rejectForm.formData.rejection }
      const data = helpers.fromData(value);
      const res = await taskReject({ id, data }).unwrap();
      if (res.status) {
        updateState('isReject', false);
        updateState("isPreview", false)
        rejectForm.reset();
      }
    } catch (err: any) {
      rejectForm.setError("rejection", err?.data?.message)
    }
  };

  return (
    <div>
      <Navber
        title="Task Review"
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
          ) : task?.data?.length > 0 ? (
            task?.data?.map((item: any, index: any) => (
              <TableRow key={index}>
                <TableCell className="relative">
                  <div className="flex items-center gap-3">
                    <Avatars
                      src={helpers.imgSource(item?.creator?.avatar) || '/avater.png'}
                      fallback={item?.creator?.name}
                      alt={item?.creator?.name}
                      fallbackStyle="avatar"
                    />
                    <span>{item?.creator?.name}</span>
                  </div>
                </TableCell>
                <TableCell>{item?.engagement?.engagement_name}</TableCell>
                <TableCell>{item?.quantity}</TableCell>
                <TableCell>
                  <h1
                    onClick={() => {
                      updateState('isPreview', true)
                      setGlobal("details", item)
                    }}
                    className="flex justify-center cursor-pointer"
                  >
                    <FavIcon name="eye" />
                  </h1>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableNoItem
              colSpan={headers?.length}
              title="No Task Review are available at the moment"
            />
          )}
        </CustomTable>
        <Pagination onClick={(v: any) => setGlobal("page", v)} {...task?.meta}></Pagination>
      </div>
      {/* ===== preview======= */}
      <Modal2
        open={state.isPreview}
        setIsOpen={(v) => updateState('isPreview', v)}
        style={`${state.isReject || state.isReport ? '!opacity-0' : ''}`}
      >
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-xl">{global?.details?.engagement?.engagement_name}</h1>
            <h1>
              <CloseIcon className="static" onClose={() => updateState('isPreview', false)} />
            </h1>
          </div>
          <div className="space-y-4">

            <p className="text-figma-gray">{global?.details?.description || 'N/A'}</p>
            <ul className="space-y-2 [&>li]:flex [&>li]:items-center [&>li]:justify-between">
              <li>
                <span>Quantity</span>
                <span>{global?.details?.quantity || 0}</span>
              </li>
              <li>
                <span>Selected Audience</span>
                <FlagBox href={helpers.imgSource(global?.details?.country?.flag) || '/blur.png'} name={global?.details?.country?.name} />
              </li>
              <li>
                <span>Total Token</span>
                <span className="flex items-center">
                  <FavIcon name="coin" className="mr-1 size-5" />
                  {global?.details?.total_token || 0}
                </span>
              </li>
              <li>
                <span>Platform</span>
                <SocialBox href={global?.details?.social?.icon_url} name={global?.details?.social?.name} />
              </li>
              <li>
                <span>Creation Date</span>
                <DateBox date={global?.details?.created_at} />
              </li>
              <li>
                <span>Link</span>
                <CopyBox value={global?.details?.link} />
              </li>
            </ul>
          </div>

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
              disabled={appLoading}
              onClick={async () => {
                const res = await taskApproved(global?.details?.id).unwrap();
                updateState("isPreview", false)
                if (res.status) {
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
              size="lg"
              variant="primary"
              className="w-full"
            >
              Approve
            </Button>
          </div>
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
          <Button disabled={reportLoading} variant="primary" className="w-full">
            Send
          </Button>
        </form>
      </Modal2>

      {/* ===== Cause of rejection======= */}
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
          <Button disabled={taskLoading} variant="primary" className="w-full">
            Send
          </Button>
        </form>
      </Modal2>
    </div>
  );
}
