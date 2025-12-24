'use client';
import Avatars from '@/components/reuseable/avater';
import { ImageGallery } from '@/components/reuseable/image-gallery';
import { ImgBox } from '@/components/reuseable/Img-box';
import Navber from '@/components/view/common/dash/navber';
import { BackBtn } from '@/components/reuseable/back-btn';
import CopyBox from '@/components/reuseable/copy-box';
import { helpers } from '@/lib';
import FavIcon from '@/icon/favIcon';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Textarea } from '@/components/ui';
import useSuccessModal from '@/components/context/sucess-box';
import { useModalState } from '@/hooks/useModalState';
import Modal2 from '@/components/reuseable/modal2';
import { CloseBtn } from '@/components/reuseable/btn';
import { useGetSuppDtsQuery, useSupportAppMutation, useSupportRejectMutation } from '@/redux/api/admin/supportApi';
import { DateBox, SocialBox } from '@/components/reuseable/social';
import FlagBox from '@/components/reuseable/flag-box';
import { useFormFields } from '@/hooks';
import { CircleAlert } from 'lucide-react';


const initState = {
  isReject: false,
  isSocial: false,
}
export default function OrderDetails() {
  const { openSucc } = useSuccessModal();
  const { id } = useParams();
  const { data } = useGetSuppDtsQuery({ id, arg: { type: 'user' } });
  const [state, updateState] = useModalState(initState);
  const router = useRouter()

  console.log(data)

  const {
    engagement,
    country,
    social_task,
    creator,
    task_attached,
    reviewer,
    rejection_reason,
    description,
    task_performer_social_ac,
    task
  } = data || {};

  const [supportReject, { isLoading: rejectLoading }] = useSupportRejectMutation()
  const [supportApp, { isLoading: appLoading }] = useSupportAppMutation()
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
      const res = await supportReject({ id, data }).unwrap();
      if (res.status) {
        updateState('isReject', false);
        rejectForm.reset();
        router.back()
      }
    } catch (err: any) {
      rejectForm.setError("rejection", err?.data?.message)
    }
  };


  return (
    <div className="mb-10">
      <Navber
        className="py-3"
        backbtn={
          <div className="items-center hidden lg:flex">
            <BackBtn iconStyle="text-figma-primary" />
            <h1 className="text-lg relative -ml-2 mb-[2px]">Back</h1>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-figma-chart p-6 rounded-xl">
          <h1 className="text-lg mb-4">Task Details</h1>
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Avatars src={helpers.imgSource(creator?.avatar) || '/avater.png'} fallback={creator?.name} alt={creator?.name} fallbackStyle="avatar" />
                <ul className="*:leading-5">
                  <li className="text-xl">{creator?.name}</li>
                  <li className="text-sm text-figma-gray">{helpers.formatDate(creator?.created_at)}</li>
                </ul>
              </div>
            </div>
            <h1 className="text-lg font-medium mb-2">{engagement?.engagement_name}</h1>
            <p className="text-figma-gray">
              {task?.description}
            </p>
            <Button
              onClick={() => updateState('isSocial', true)}
              variant="secondary"
              className="w-full  text-figma-primary"
            >
              User Social
            </Button>
            <ul className="space-y-2 [&>li]:flex [&>li]:items-center [&>li]:justify-between">
              <li>
                <span>Quantity</span>
                <span>{task?.quantity || 0}</span>
              </li>
              <li>
                <span>Selected Audience</span>
                <FlagBox href={helpers.imgSource(country?.flag) || '/blur.png'} name={country?.name} />
              </li>
              <li>
                <span>Per user earned Tokens</span>
                <span className="flex items-center">
                  <FavIcon name="coin" className="mr-1 size-5" />
                  {task?.per_perform || 0}
                </span>
              </li>
              <li>
                <span>Platform</span>
                <SocialBox href={social_task?.icon_url} name={social_task?.name} />
              </li>
              <li>
                <span>Creation Date</span>
                <DateBox date={task?.created_at} />
              </li>
              <li>
                <span>Link</span>
                <CopyBox value={task?.link} />
              </li>

              {task_attached?.length > 0 && (
                <li className='mt-4'>
                  <ImageGallery images={task_attached?.map((img: any) => img?.file_url)}>
                    <div className="grid grid-cols-4 gap-10">
                      {task_attached?.slice(0, 4)?.map((item: any, index: any) => (
                        <ImgBox key={index} src={helpers.imgSource(item?.file_url) || "/blur.png"} alt="photo2" className="w-[70px] h-[100px] mx-auto" />
                      ))}
                    </div>
                  </ImageGallery>
                </li>
              )}

            </ul>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-10 mt-5">
              <Button onClick={() => updateState('isReject', true)} variant="secondary">
                Reject
              </Button>
              <Button
                onClick={async () => {
                  const res = await supportApp(id).unwrap();
                  console.log(res)
                  if (res?.status) {
                    const { close } = await openSucc({
                      title: 'Successfully',
                      description: 'You approved the task',
                    });
                    const timer = setTimeout(() => {
                      close();
                      clearTimeout(timer);
                      router.back()
                    }, 2000);
                  }
                }}
                disabled={appLoading}
                variant="primary"
              >
                Approve
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-figma-chart p-6 h-fit rounded-xl">
          <div>
            <h1 className="text-xl">Issue</h1>
            <p className="text-figma-gray">{rejection_reason}</p>
          </div>
          <h1 className="text-xl my-4">Reviewed By</h1>
          <div className="space-y-3">
            <div className="mb-10">
              <ImgBox
                className="size-30 rounded-xl mx-auto"
                src={helpers.imgSource(reviewer?.avatar) || '/avater.png'}
                alt="img"
              ></ImgBox>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-figma-gray">Full name</span>
              <span className="text-white">{reviewer?.name}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-figma-gray">Email</span>
              <span className="text-white">{reviewer?.email}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-figma-gray">Phone number</span>
              <span className="text-white">{reviewer?.phone}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-figma-gray">Region</span>
              <span className="text-white">{reviewer?.country?.name}</span>
            </div>
          </div>
        </div>
      </div>
      {/* ===== account varification reject======= */}
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
      {/* ========User social======== */}
      <Modal2
        open={state.isSocial}
        setIsOpen={(v) => updateState('isSocial', v)}
        className="sm:max-w-sm"
      >
        <div>
          <ImgBox src={helpers.imgSource(task_performer_social_ac?.profile_image) || '/avater.png'} className="w-full h-[250px]" alt="imgbox1"></ImgBox>
          <ul className="*:text-lg my-3">
            <li>
              <span className="text-figma-gray">Username: </span>{task_performer_social_ac?.profile_name}
            </li>
            <li>
              {' '}
              <span className="text-figma-gray">Notes: </span>{task_performer_social_ac?.note}
            </li>
          </ul>
          {/* performer takle checkbox show hobe */}
          <CloseBtn className="bg-figma-primary" onClose={() => updateState('isSocial', false)} />
        </div>
      </Modal2>
    </div>
  );
}
