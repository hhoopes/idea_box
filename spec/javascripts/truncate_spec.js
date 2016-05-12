//=require helpers

describe("truncateText", function (){
  it('truncates to 100 chars', function (){
    var string = Array(102).join("a");
    expect(string.length).to.eql(101);
    expect(truncateText(string).length).to.eql(100);
  })
})
