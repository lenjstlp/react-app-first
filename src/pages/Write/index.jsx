import Editor from '@/components/writeEditor'
function Write() {
  function valueChange(val) {
    console.log('valueChange', val)
  }

  return (
    <>
      <div className='h-[60px] bg-[#fff]'>q123</div>
      <div className='h-[100%]'>
        <Editor valueChange={valueChange} />
      </div>
    </>
  )
}

export default Write
