import { useEffect, useRef, useState } from 'react';
import PreviewBox from './PreviewBox.jsx';
import Search from './Search.jsx';
import { getInfos, getSuggestions } from './utils/API.js';
import { getDownloadUrl, isYtUrl } from './utils/helpers.js';
import { useParams } from 'react-router-dom';
import bgImage from "../images/BG.jpg";

  
export default function Download() {
    const {id} = useParams();
    console.log("ID: ", id);
    const [downloadUrl, setDownloadUrl] = useState('');
    const [input, setInput] = useState(`https://www.youtube.com/watch?v=${id}`);
    const [isConvertionLoading, setConvertionLoading] = useState(false);
    const [isSearchLoading, setSearchLoading] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [pagingInfo, setPagingInfo] = useState(null);
    const [error, setError] = useState(false);
    const downloadBtnRef = useRef(null);
    const [downloads, setDownloads] = useState([]);
    const [ loading, setLoading ] = useState(false);

  
    useEffect(() => {
      const storedDownloads = localStorage.getItem('downloads');
      if (storedDownloads && JSON.parse(storedDownloads)?.length > 0) {
        setDownloads(JSON.parse(storedDownloads));
      }
    }, []);
  
    useEffect(() => {
      localStorage.setItem('downloads', JSON.stringify(downloads));
    }, [downloads]);
  
    useEffect(() => {
      if (downloadUrl.length && downloadBtnRef?.current) {
        setConvertionLoading(false);
        downloadBtnRef.current.click();
      }
    }, [downloadUrl]);
  
    const handleChange = (event) => {
      setInput(event.target.value);
    };
  
    const reset = () => {
      setError(false);
      setInput('');
      setSearchLoading(false);
      setConvertionLoading(false);
    }
  
    const fetchSuggestions = async () => {
      setError(false);
      setSearchLoading(true);
      try {
        const { data } = await getSuggestions(input, pagingInfo?.nextPageToken);
        setPagingInfo(data.pagingInfo);
        setSuggestions((previousSuggestions) => [
          ...previousSuggestions,
          ...data.data,
        ]);
        setSearchLoading(false);
      } catch (err) {
        setError(true);
        // if (err && err.status === 403) {
        console.log('YouTube Search Limit exceeded');
        // }
        setTimeout(() => {
          reset();
        }, 2000);
        console.error(err);
      }
    };
  
  
    const handleSearch = async () => {
      setLoading(true);
      const isYouTubeUrl = isYtUrl(input);
      if (!input) {
        setError(true);
        return;
      }
      if (isYouTubeUrl) {
        setError(false);
        setConvertionLoading(true);
        try {
          const { data } = await getInfos(input);
          const {
            data: { videoDetails },
          } = data;
          setCurrentVideo(videoDetails);
          setConvertionLoading(false);
        } catch (err) {
          setError(true);
          setConvertionLoading(false);
        }
      } else {
        fetchSuggestions();
      }
      setLoading(false);
    };
  
    const chooseFormat = async (format, videoId) => {
      setDownloadUrl('');
      try {
        const videoInfo = await getInfos(videoId);
        const downloadUrl = getDownloadUrl(videoId, format);
        setDownloadUrl(downloadUrl);
        const downloadInfo = {
          title: videoInfo.data.data.videoDetails.title,
          imageUrl: videoInfo.data.data.videoDetails.thumbnails[0].url,
          videoLength: videoInfo.data.data.videoDetails.lengthSeconds,
          format,
          date: new Date(),
        };
        setDownloads((prevState) => [...prevState, downloadInfo]);
        console.log("Downloading started...");

      } catch (err) {
        console.log("Error while downloading")
        setError(true);
      }
    };
  
    const handleDeleteHistory = () => {
      localStorage.removeItem('downloads');
      setDownloads([]);
    };
  
    return (
      <>
        <div className="md:w-[100%] h-[100%] mx-auto flex flex-col justify-center items-center"
          style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <Search
              handleChange={handleChange}
              handleSearch={handleSearch}
              error={error}
              input={input}
              isLoading={
                (isConvertionLoading && !isSearchLoading) ||
                (!isConvertionLoading && isSearchLoading)
              }
              loading={loading}
              setLoading={setLoading}
            />
            <PreviewBox
              data={currentVideo}
              chooseFormat={chooseFormat}
              isLoading={isConvertionLoading}
            />

        </div>

        <div className='hidden'>
          <a href={downloadUrl} download ref={downloadBtnRef}>
            {downloadUrl}
          </a>
        </div> 
      </>
    );
  }
  