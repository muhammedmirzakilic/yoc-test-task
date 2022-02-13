describe("Video Player", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  });

  it("Shouldn't autoplay video", async () => {
    const ispaused = await page.evaluate(() => {
      const video = document.querySelector("video");
      if (!video) return null;
      return video.paused;
    });
    expect(ispaused).toBe(true);
  });

  it("Shouldn't autoplay when less than %50 of video visible", async () => {
    await page.evaluate(() => {
      const videoElement = document.querySelector("video");
      if (!videoElement) return;
      window.scroll({
        top:
          videoElement.offsetTop -
          window.innerHeight +
          videoElement.offsetHeight / 3,
      });
    });
    await page.waitForNetworkIdle();
    const ispaused = await page.evaluate(() => {
      const video = document.querySelector("video");
      if (!video) return null;
      return video.paused;
    });
    expect(ispaused).toBe(true);
  });

  it("Should autoplay when more than %50 of video visible", async () => {
    await page.evaluate(() => {
      const videoElement = document.querySelector("video");
      if (!videoElement) return;
      window.scroll({
        top:
          videoElement.offsetTop -
          window.innerHeight +
          (videoElement.offsetHeight * 2) / 3,
      });
    });
    await page.waitForNetworkIdle();
    const ispaused = await page.evaluate(() => {
      const video = document.querySelector("video");
      if (!video) return null;
      return video.paused;
    });
    expect(ispaused).toBe(false);
  });
});
