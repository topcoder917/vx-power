import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config/config';
// tslint:disable-next-line: max-line-length
import { StringsObject, QuotesObject, NotificationObject, UserObject, VideoSubCategoryObject, VideoListObject, DietsObject, CategoriesObject, PostsObject, GoalsObject, LevelsObject, TagsObject, EquipmentsObject, BodypartsObject, WorkoutsObject, MuscleObject, EquipmentObject, ExercisesObject } from '../interfaces/interfaces';

const Url = config.Url;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  page = 0;

  constructor( private http: HttpClient ) { }
  private ejectQuery<T>( query: string ) {
    query = Url + query;
    console.log("query", query);
    return this.http.get<T>( query );
  }

  getDataStrings() {
    return this.ejectQuery<StringsObject>('/json/data_strings.php');
  }

  getDataMotivation(today : any) {
    return this.ejectQuery<QuotesObject[]>('/json/data_quotes.php?today='+today);
  }

  getDataFeaturedDiets() {
    return this.ejectQuery<DietsObject[]>('/json/data_diets.php?featured=1');
  }

  getDataCategories() {
    return this.ejectQuery<CategoriesObject[]>('/json/data_categories.php');
  }
  getDataVideoCategories() {
    return this.ejectQuery<CategoriesObject[]>('/json/data_videocategories.php');
  }
  getVideoSubCategories(id: number) {
    return this.ejectQuery<VideoSubCategoryObject[]>(`/json/data_videosubcategory.php?parent_id=${id}`);
  }
  getVideoList(id: number) {
    return this.ejectQuery<VideoListObject[]>(`/json/data_videolist.php?category_id=${id}`);
  }
  getDataGoals() {
    return this.ejectQuery<GoalsObject[]>('/json/data_goals.php');
  }

  getDataLevels() {
    return this.ejectQuery<LevelsObject[]>('/json/data_levels.php');
  }

  getDataTags() {
    return this.ejectQuery<TagsObject[]>('/json/data_tags.php');
  }

  getDataEquipments() {
    return this.ejectQuery<EquipmentsObject[]>('/json/data_equipments.php');
  }

  getDataBodyparts() {
    return this.ejectQuery<BodypartsObject[]>('/json/data_bodyparts.php');
  }

  getDataFeaturedPosts() {
    return this.ejectQuery<PostsObject[]>('/json/data_posts.php?featured=1');
  }

  getDataRecentPosts(limit: number) {
    return this.ejectQuery<PostsObject[]>(`/json/data_posts.php?limit=${limit}`);
  }

  getDataWorkoutsByGoal(id: number) {
    return this.ejectQuery<WorkoutsObject[]>(`/json/data_workouts.php?goal=${id}`);
  }

  getDataWorkoutsByLevel(id: number) {
    return this.ejectQuery<WorkoutsObject[]>(`/json/data_workouts.php?level=${id}`);
  }

  getDataExercisesByBodypart(id: number) {
    return this.ejectQuery<MuscleObject[]>(`/json/data_bodypart.php?id=${id}`);
  }

  getDataExercisesByEquipment(id: number) {
    return this.ejectQuery<EquipmentObject[]>(`/json/data_equipment.php?id=${id}`);
  }

  getDataDietsByCategory(id: number) {
    return this.ejectQuery<DietsObject[]>(`/json/data_diets.php?category=${id}`);
  }

  getDataPostsByTag(id: number) {
    return this.ejectQuery<PostsObject[]>(`/json/data_posts.php?tag=${id}`);
  }

  getDataExerciseById(id: number) {
    return this.ejectQuery(`/json/data_exercises.php?id=${id}&limit=1`);
  }

  getDataWorkoutById(id: number) {
    return this.ejectQuery(`/json/data_workouts.php?id=${id}&limit=1`);
  }

  getDataDietById(id: number) {
    return this.ejectQuery(`/json/data_diets.php?id=${id}&limit=1`);
  }

  getDataPostById(id: number) {
    return this.ejectQuery(`/json/data_posts.php?id=${id}&limit=1`);
  }

  getDataWorkoutExercisesByDay(id: number, day: number) {
    return this.ejectQuery<ExercisesObject[]>(`/json/data_days.php?id=${id}&day=${day}`);
  }
  getUnreadNotifications(email : any) {
    return this.ejectQuery<NotificationObject[]>(`/json/data_notifications.php?email=${email}`);
  }
  getUnreadCount(email : any) {
    return this.ejectQuery<UserObject[]>(`/json/data_unreadcount.php?email=${email}`);
  }
  readNotifications(email : any) {
    return this.ejectQuery<NotificationObject[]>(`/json/data_readnotifications.php?email=${email}`);
  }
  registerNewUser(value: any) {
    return this.ejectQuery<UserObject[]>(`/json/data_user.php?&username=${value.name}&password=${value.password}&email=${value.email}`);
  }
  checkUserExist(value: any) {
    
    return this.ejectQuery<UserObject[]>(`/json/check_user.php?&email=${value.email}`);
  }  
}
