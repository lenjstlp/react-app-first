import Editor from '@/components/writeEditor'
function Write() {
  function valueChange(val) {
    console.log('valueChange', val)
  }

  return (
    <div className='h-[100%]'>
      <Editor valueChange={valueChange} />
    </div>
  )
}

export default Write
