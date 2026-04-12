import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useOfflineSync, getOfflineLessons, getOfflineNotes, removeLessonOffline, removeNoteOffline, downloadCourseOffline, getOfflineStorageEstimate } from '@/hooks/useOfflineSync';
import { useAuth } from '@/components/Auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Download, Trash2, WifiOff, Wifi, BookOpen, FileText, HardDrive, Loader2, CloudOff, RefreshCw, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

const OfflineContentPage = () => {
  const { user } = useAuth();
  const { isOnline, pendingCount, isSyncing, syncPendingActions } = useOfflineSync();
  const [offlineLessons, setOfflineLessons] = useState<any[]>([]);
  const [offlineNotes, setOfflineNotes] = useState<any[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [storage, setStorage] = useState({ usageMB: 0, quotaMB: 0 });

  const loadOfflineData = async () => {
    const [lessons, notes, storageEst] = await Promise.all([
      getOfflineLessons(),
      getOfflineNotes(),
      getOfflineStorageEstimate(),
    ]);
    setOfflineLessons(lessons);
    setOfflineNotes(notes);
    setStorage(storageEst);
  };

  const loadEnrolledCourses = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('enrollments')
      .select('course_id, courses(id, title, subject)')
      .eq('user_id', user.id);
    setEnrolledCourses(data?.map((e: any) => e.courses).filter(Boolean) || []);
  };

  useEffect(() => {
    loadOfflineData();
    if (isOnline) loadEnrolledCourses();
  }, [user, isOnline]);

  const handleDownloadCourse = async (courseId: string, courseName: string) => {
    setDownloading(courseId);
    const count = await downloadCourseOffline(courseId, courseName);
    toast.success(`Downloaded ${count} lessons for offline use`);
    await loadOfflineData();
    setDownloading(null);
  };

  const handleRemoveLesson = async (id: string) => {
    await removeLessonOffline(id);
    toast.info('Lesson removed from offline storage');
    loadOfflineData();
  };

  const handleRemoveNote = async (id: string) => {
    await removeNoteOffline(id);
    toast.info('Note removed from offline storage');
    loadOfflineData();
  };

  const storagePercent = storage.quotaMB > 0 ? Math.min(100, (storage.usageMB / storage.quotaMB) * 100) : 0;

  const groupedLessons = offlineLessons.reduce((acc: Record<string, any[]>, l) => {
    const course = l.courseName || 'Unknown';
    if (!acc[course]) acc[course] = [];
    acc[course].push(l);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Status Banner */}
      <Card className={`border-2 ${isOnline ? 'border-green-500/30 bg-green-500/5' : 'border-orange-500/30 bg-orange-500/5'}`}>
        <CardContent className="pt-4 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isOnline ? (
                <Wifi className="w-5 h-5 text-green-500" />
              ) : (
                <WifiOff className="w-5 h-5 text-orange-500 animate-pulse" />
              )}
              <div>
                <p className="font-semibold text-foreground text-sm">
                  {isOnline ? 'You\'re Online' : 'You\'re Offline'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isOnline
                    ? `${offlineLessons.length} lessons & ${offlineNotes.length} notes saved for offline`
                    : 'Access your downloaded content below'}
                </p>
              </div>
            </div>
            {pendingCount > 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={syncPendingActions}
                disabled={!isOnline || isSyncing}
              >
                {isSyncing ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <RefreshCw className="w-3 h-3 mr-1" />}
                Sync ({pendingCount})
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Storage */}
      <Card className="bg-card">
        <CardContent className="pt-4 pb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Offline Storage</span>
            </div>
            <span className="text-xs text-muted-foreground">{storage.usageMB} MB / {storage.quotaMB} MB</span>
          </div>
          <Progress value={storagePercent} className="h-2" />
        </CardContent>
      </Card>

      <Tabs defaultValue="lessons" className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="lessons" className="text-xs">
            <BookOpen className="w-3 h-3 mr-1" /> Lessons ({offlineLessons.length})
          </TabsTrigger>
          <TabsTrigger value="notes" className="text-xs">
            <FileText className="w-3 h-3 mr-1" /> Notes ({offlineNotes.length})
          </TabsTrigger>
          <TabsTrigger value="download" className="text-xs">
            <Download className="w-3 h-3 mr-1" /> Download
          </TabsTrigger>
        </TabsList>

        {/* Offline Lessons */}
        <TabsContent value="lessons" className="space-y-4 mt-4">
          {offlineLessons.length === 0 ? (
            <Card className="bg-card">
              <CardContent className="pt-8 pb-8 text-center">
                <CloudOff className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="font-medium text-foreground">No Offline Lessons</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Download courses to access lessons without internet
                </p>
              </CardContent>
            </Card>
          ) : (
            Object.entries(groupedLessons).map(([courseName, lessons]) => (
              <Card key={courseName} className="bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-foreground">{courseName}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {lessons.map((lesson: any) => (
                    <div key={lesson.id} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50 border border-border">
                      <div className="flex-1 min-w-0 mr-3">
                        <p className="text-sm font-medium text-foreground truncate">{lesson.title}</p>
                        {lesson.duration_minutes && (
                          <p className="text-xs text-muted-foreground">{lesson.duration_minutes} min</p>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveLesson(lesson.id)}
                        className="text-muted-foreground hover:text-destructive shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Offline Notes */}
        <TabsContent value="notes" className="space-y-3 mt-4">
          {offlineNotes.length === 0 ? (
            <Card className="bg-card">
              <CardContent className="pt-8 pb-8 text-center">
                <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="font-medium text-foreground">No Offline Notes</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Your notes will be automatically saved for offline access
                </p>
              </CardContent>
            </Card>
          ) : (
            offlineNotes.map(note => (
              <Card key={note.id} className="bg-card">
                <CardContent className="pt-3 pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0 mr-3">
                      <p className="font-medium text-sm text-foreground">{note.title || 'Untitled Note'}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {note.content?.slice(0, 150)}...
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveNote(note.id)}
                      className="text-muted-foreground hover:text-destructive shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Download Courses */}
        <TabsContent value="download" className="space-y-3 mt-4">
          {!isOnline ? (
            <Card className="bg-card">
              <CardContent className="pt-8 pb-8 text-center">
                <WifiOff className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="font-medium text-foreground">You're Offline</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Connect to internet to download courses
                </p>
              </CardContent>
            </Card>
          ) : enrolledCourses.length === 0 ? (
            <Card className="bg-card">
              <CardContent className="pt-8 pb-8 text-center">
                <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="font-medium text-foreground">No Enrolled Courses</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Enroll in courses to download them for offline study
                </p>
              </CardContent>
            </Card>
          ) : (
            enrolledCourses.map(course => {
              const alreadyDownloaded = offlineLessons.some(l => l.course_id === course.id);
              return (
                <Card key={course.id} className="bg-card">
                  <CardContent className="pt-3 pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0 mr-3">
                        <p className="font-medium text-sm text-foreground">{course.title}</p>
                        {course.subject && (
                          <Badge variant="outline" className="text-[10px] mt-1">{course.subject}</Badge>
                        )}
                      </div>
                      {alreadyDownloaded ? (
                        <Badge variant="outline" className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                          <CheckCircle className="w-3 h-3 mr-1" /> Saved
                        </Badge>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={downloading === course.id}
                          onClick={() => handleDownloadCourse(course.id, course.title)}
                        >
                          {downloading === course.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <><Download className="w-3.5 h-3.5 mr-1" /> Download</>
                          )}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OfflineContentPage;
